import { useEffect, useState } from 'react'
import style from './Coments.module.css'
import jwt_decode from 'jwt-decode';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios'

const Coments = () => {

    const history = useHistory()

    const [comments, setComments] = useState([])
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
            const response = await axios.get(`http://localhost:3001/coments/${id}`)
            setComments(response.data)
        }
        getAllComents()
    }, [commentsDeleted, commentsUpdated])

    const onChangeHandler = (event) => {
        setCurrentComment(event.target.value)
    }

    const postComment = async () => {
        if(userId === null){
            alert('Debes iniciar sesión para poder comprar');
            history.push('/login');
            return;
          }
        const newComment = {
            productId: id,
            userId: userId,
            content: currentComment
        }
        const response = await axios.post('http://localhost:3001/coments', newComment)
        setComments([...comments, response.data])
    }

    const deleteComment = async (event) => {
        const comentId = event.target.name

        const response = await axios.delete(`http://localhost:3001/coments/${comentId}`, { data: { userId: userId } })
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
        const response = await axios.put('http://localhost:3001/coments', updatedComment)
        console.log(response.data);
        const editedComments = comments.map(comment => (comment.id === response.data.id ? response.data : comment))
        setComments(editedComments)
        setEditComment({ id: null, content: '' })
        setCommentsUpdated(!commentsUpdated)
    }

    const editCommentHandler = (comment) => {
        setEditComment({ id: comment.id, content: comment.content })
    }

    return (
        <div className={style.container}>
            <div className={style.containerComents}>
                <input type="text" placeholder='Escribe un comentario...' onChange={onChangeHandler} />
                <button onClick={postComment}>Publicar</button>
                {comments.map((comment, index) => (
                    <div key={comment.id} className={style.comentarios}>
                        <h3>{comment.name}</h3>
                        <h4>{comment.createdAt.slice(0, 10)}</h4>
                        {editComment.id === comment.id ? (
                            <form onSubmit={editCommentSubmit} >
                                <textarea value={editComment.content} onChange={(event) => setEditComment({ ...editComment, content: event.target.value })} />
                                <button name={comment.id} type="submit">Guardar</button>
                            </form>
                        ) : (
                            <p>{comment.content}</p>
                        )}
                        {comment.userId === userId && (
                            <div>
                                <button onClick={() => editCommentHandler(comment)}>Editar</button>
                                <button name={comment.id} onClick={deleteComment}>Eliminar</button>
                            </div>
                        )
                        }

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Coments