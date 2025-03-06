import { remove } from "@/redux/messagesSlice";
import { messages } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const MessagesBlock = () => {
    const chatMessages = useSelector(messages);
    const dispatch = useDispatch();

    const handleRemove = (i: number) => {
		dispatch(remove(i));
	}

    return (chatMessages.map((message, i) => (
        <div className="m-5" key={i} onClick={() => handleRemove(i)}>
            {message.content}
        </div>)))
}

export default MessagesBlock;