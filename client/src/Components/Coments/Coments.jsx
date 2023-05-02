import { useEffect, useState } from 'react'
import style from './Coments.module.css'
import jwt_decode from 'jwt-decode';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Fade from "react-reveal/Fade";

const Coments = () => {

    const history = useHistory()

    const [comments, setComments] = useState([])
    const [currentComment, setCurrentComment] = useState('')
    const [commentsDeleted, setCommentsDeleted] = useState(false)
    const [commentsUpdated, setCommentsUpdated] = useState(false)
    const [editComment, setEditComment] = useState({ id: null, content: '' })
    const { id } = useParams()
    const [cont, setCont] = useState(0)

    const token = localStorage.getItem('token');
    let userId = null;
    if (token) {
        const decodedToken = jwt_decode(token);
        userId = decodedToken.id;
    }
    const [userRol, setUserRol] = useState(null)
    useEffect(() => {
        const getAllComents = async () => {
            const response = await axios.get(`http://localhost:3001/coments/${id}?page=${cont}`)
            const user = await axios.get(`http://localhost:3001/users/profile/${userId}`)
            setUserRol(user.data.rolId);
            console.log(response.data);
            setComments(response.data)
            setLatestComments(response.data.length)
        }
        getAllComents()
    }, [commentsDeleted])

    const onChangeHandler = async (event) => {
        setCurrentComment(event.target.value)

    }

    const postComment = async () => {
        if (userId === null) {
            alert('Debes iniciar sesión para poder comentar');
            history.push('/login');
            return;
        }
        if (currentComment.length === 0) return
        const newComment = {
            productId: id,
            userId: userId,
            content: currentComment
        }
        const response = await axios.post('http://localhost:3001/coments', newComment)
        setCurrentComment("")
        console.log(currentComment, "comment:");
        console.log([response.data, ...comments]);
        setComments([response.data, ...comments])
    }

    const deleteComment = async (event) => {
        const comentId = event.target.name
        const response = await axios.delete(`http://localhost:3001/coments/${comentId}`, { data: { userId: userId } })
        const responseUptaded = await axios.get(`http://localhost:3001/coments/updatedcomments/${id}` )
        console.log(responseUptaded.data);
        setComments(responseUptaded.data);
    }

    const editCommentSubmit = async (event) => {
        event.preventDefault()
        const updatedComment = {
            userId: userId,
            content: editComment.content,
            comentId: editComment.id
        }
        console.log(updatedComment);
        const response = await axios.put('http://localhost:3001/coments', updatedComment)
        console.log(response.data);
        const editedComments = comments.map(comment => {
            if(comment.id === editComment.id)
            {
                return {...comment, content: editComment.content}
            }
            else
            {
                return comment
            }
        })
        console.log(editedComments);
        setComments(editedComments)
        setEditComment({ id: null, content: '' })

    }

    const editCommentHandler = (comment) => {
        setEditComment({ id: comment.id, content: comment.content })
    }
    const [latestComments, setLatestComments] = useState(null)
    const pagesHandler = async () => {
        if (cont + 1 <= Math.ceil(comments.length / 3)) {
            const nextPage = cont + 1;
            setCont(nextPage);
            //console.log(`http://localhost:3001/coments/${id}?page=${cont}`);
            const response = await axios.get(`http://localhost:3001/coments/${id}?page=${nextPage}`)
            console.log(response.data + 'pageshandler');
            setComments([...comments, ...response.data])
            console.log([...comments, ...response.data], "comments del ver mas");
            setLatestComments(response.data.length)
        } else 
        {
            setLatestComments(null)
            return
        }
    }
    console.log("comments: ", comments, "LatestComments:", latestComments);
    return (
        <div className="flex flex-col items-center justify-center w-[100%] bg-chocolate-blanco rounded-xl">
            <div className="w-full">
                <div className='flex items-center my-6 justify-evenly'>
                    <textarea type="text" placeholder='Escribe un comentario...' onChange={onChangeHandler} maxlength="150" className="p-4 mb-2 text-base border-none shadow-sm bg-chocolate-mantecol w-[70%] h-28 rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom cursor-text focus:outline-chocolate-bombom" />

                    <button onClick={postComment} className='p-1 m-2 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-blanco'>
                        Publicar
                    </button>
                </div>

                <Fade left cascade>
                    <div className='grid w-full grid-cols-1 p-6 divide-y divide-chocolate-oscuro'>

                        {comments.map((comment, index) => (
                            <div key={comment.id} className="">

                                <div className='flex items-center justify-between pt-3'>
                                    <div className={style.nameAndProfile}>
                                        <img src={comment.image} className={style.profile} alt="" />
                                        <h3 className={style.name}>
                                            {comment.name}
                                        </h3>
                                    </div>

                                    <h4>
                                        {comment.createdAt.slice(0, 10)}
                                    </h4>
                                </div>

                                {editComment.id === comment.id ? (
                                    <form onSubmit={editCommentSubmit} >
                                        <textarea value={editComment.content} onChange={(event) => setEditComment({ ...editComment, content: event.target.value })} maxlength="150" className="p-4 mb-2 text-base border-none shadow-sm bg-chocolate-mantecol w-[70%] h-28 rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom cursor-text focus:outline-chocolate-bombom" />
                                        <button name={comment.id} type="submit" className='p-1 m-2 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-blanco'>
                                            Guardar
                                        </button>
                                    </form>
                                ) : (
                                    <p className='m-6 text-left break-words'>
                                        {comment.content}
                                    </p>
                                )}
                                {((comment.userId === userId) || (userRol  === 2)) && (
                                    <div className='flex items-center justify-end'>
                                        <button onClick={() => editCommentHandler(comment)} className='p-1 m-2 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-blanco'>
                                            Editar
                                        </button>
                                        <button name={comment.id} onClick={deleteComment} className='p-1 m-2 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-blanco'>
                                            Eliminar
                                        </button>
                                    </div>
                                )
                                }

                            </div>
                        ))}


                    </div>
                </Fade>
                {
                     latestComments === 3 &&
                    <button onClick={pagesHandler} className='p-1 m-10 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-blanco'>
                        Ver mas comentarios...
                    </button>
                }
            </div>

        </div>
    )
}

export default Coments