"use client"
import React, { ChangeEventHandler, useEffect, useState } from "react";
import Header from "@/components/Header";
import { AppDispatch, engineParams, messages } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { add, fetchMessages, remove } from "@/redux/messagesSlice";
import { EngineRole } from "@/services/gptApi";
import { changeEngine, changeModel, EnginesParams } from "@/redux/engineParamsSlice";
import { Engines } from "@/constants/main";


const ChatPage: React.FC = () => {
	const chatMessages = useSelector(messages);
	const engParams = useSelector(engineParams);
	const dispatch: AppDispatch = useDispatch();
	const [text, setText] = useState<string>();

	const handleChangeText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setText(e.target.value)
	}

	const handleFetchMessages = () => {
		const newMessage = { role: EngineRole.user, content: text || '' }
		dispatch(add(newMessage));
		dispatch(fetchMessages({ messages: [...chatMessages, newMessage], params: engParams }));
	}

	const handleRemove = (i: number) => {
		dispatch(remove(i));
	}
	return (<div className="flex flex-col mt-10">
		<Header />

		{Object.keys(EnginesParams).map((engine) => (
			<div key={engine} onClick={() => dispatch(changeEngine(engine as Engines))}>
				{engine}
			</div>)
		)}
		{engParams.models.availableModels.map(model => (
			<div key={model} onClick={() => dispatch(changeModel(model))}>
				{model}
			</div>))}
		{chatMessages.map((message, i) => (
			<div className="m-5" key={i} onClick={() => handleRemove(i)}>
				{message.content}
			</div>))}
		<div>{engParams.models.current}</div>
		<button className="p-3 bg-red-900" onClick={handleFetchMessages}>Click</button>
		<textarea className="text-black p-4" name="Message" id="input-message" onChange={handleChangeText}></textarea>
	</div>)
}

export default ChatPage;