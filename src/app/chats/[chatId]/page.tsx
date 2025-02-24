"use client"
import React, { ChangeEventHandler, useEffect, useState } from "react";
import Header from "@/components/Header";
import { messages } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { add, fetchMessages } from "@/redux/messagesSlice";
import { EngineRole } from "@/services/gptApi";


const ChatPage: React.FC = () => {
	const chatMessages = useSelector(messages);
	const dispatch = useDispatch();
	const [text, setText] = useState<string>();
	console.log(chatMessages);

	const handleChangeText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setText(e.target.value)
	}

	return (<div className="flex flex-col mt-10">
		<Header />
		{chatMessages.map((message, i) => (<div key={i}>
			{message.content}
		</div>))}
		<button onClick={async () => {
			const newMessage = { role: EngineRole.user, content: text || '' }
			dispatch(add(newMessage));
			dispatch(fetchMessages([...chatMessages, newMessage]));
		}}>Click</button>
		{text}
		<textarea className="color-black" name="Message" id="input-message" onChange={handleChangeText}></textarea>
	</div>)
}

export default ChatPage;