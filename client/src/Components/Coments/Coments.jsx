import { useEffect, useState } from 'react'
import style from './Coments.module.css'
import jwt_decode from 'jwt-decode';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Fade from "react-reveal/Fade";

const Coments = () => {

    const history = useHistory()

    const [comments, setComments] = useState([])
    console.log(comments);
    const [currentComment, setCurrentComment] = useState('')
    const [commentsDeleted, setCommentsDeleted] = useState(false)
    const [commentsUpdated, setCommentsUpdated] = useState(false)
    const [editComment, setEditComment] = useState({ id: null, content: '' })
    const { id } = useParams()

    const token = sessionStorage.getItem('token');
    let userId = null;
    if (token) {
        const decodedToken = jwt_decode(token);
        userId = decodedToken.id;
        console.log(userId);
    }
    console.log(userId);
    useEffect(() => {
        const getAllComents = async () => {
            const response = await axios.get(`/coments/${id}`)
            setComments(response.data)
            setLatestComments(response.data.length)
        }
        getAllComents()
    }, [commentsDeleted, commentsUpdated])

    const onChangeHandler = (event) => {
        setCurrentComment(event.target.value)
    }

    const postComment = async () => {
        if (userId === null) {
            alert('Debes iniciar sesión para poder comprar');
            history.push('/login');
            return;
        }
        if (currentComment.length === 0) return
        const newComment = {
            productId: id,
            userId: userId,
            content: currentComment
        }
        const response = await axios.post('/coments', newComment)
        setComments([response.data, ...comments])
    }

    const deleteComment = async (event) => {
        const comentId = event.target.name

        const response = await axios.delete(`/coments/${comentId}`, { data: { userId: userId } })
        setCommentsDeleted(!commentsDeleted)
        console.log(comments);
    }

    const editCommentSubmit = async (event) => {
        event.preventDefault()
        const updatedComment = {
            userId: userId,
            content: editComment.content,
            comentId: editComment.id
        }
        console.log(updatedComment);
        const response = await axios.put('/coments', updatedComment)
        console.log(response.data);
        const editedComments = comments.map(comment => (comment.id === response.data.id ? response.data : comment))
        setComments(editedComments)
        setEditComment({ id: null, content: '' })
        setCommentsUpdated(!commentsUpdated)
    }

    const editCommentHandler = (comment) => {
        setEditComment({ id: comment.id, content: comment.content })
    }
    const [cont, setCont] = useState(2)
    const [latestComments, setLatestComments] = useState(null)
    const pagesHandler = async () => {
        const response = await axios.get(`/coments/${id}?page=${cont}`)
        setCont(cont + 1)
        setComments([...comments, ...response.data])
        setLatestComments(response.data.length)
    }

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
                                    <h3>
                                        {comment.name}
                                    </h3>
                                    <h4>
                                        {comment.createdAt.slice(0, 10)}
                                    </h4>
                                </div>

                                {editComment.id === comment.id ? (
                                    <form onSubmit={editCommentSubmit} >
                                        <textarea value={editComment.content} onChange={(event) => setEditComment({ ...editComment, content: event.target.value })} maxlength="150"  className="p-4 mb-2 text-base border-none shadow-sm bg-chocolate-mantecol w-[70%] h-28 rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom cursor-text focus:outline-chocolate-bombom"/>
                                        <button name={comment.id} type="submit" className='p-1 m-2 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-blanco'>
                                            Guardar
                                        </button>
                                    </form>
                                ) : (
                                    <p className='m-6 text-left break-words'>
                                        {comment.content}
                                    </p>
                                )}
                                {comment.userId === userId && (
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