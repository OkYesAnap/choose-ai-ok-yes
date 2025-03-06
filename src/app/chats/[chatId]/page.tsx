"use client"
import React, { ChangeEventHandler, useCallback, useState } from "react";
import Header from "@/components/Header";
import { AppDispatch, engineParams, messages } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { add, EngineParams, fetchMessages } from "@/redux/messagesSlice";
import { EngineRole } from "@/services/gptApi";
import { changeEngine, changeModel, enginesNamesList } from "@/redux/engineParamsSlice";
import MessagesBlock from "@/components/Messages/MessagesBlock";
import DropDown from "@/components/DropDown";


const ChatPage: React.FC = () => {
	const chatMessages = useSelector(messages);
	const engParams = useSelector(engineParams);
	const engineCurrent = engParams.currentEngine;
	const { available, current } = engParams.config[engineCurrent].models;
	const dispatch: AppDispatch = useDispatch();
	const [text, setText] = useState<string>();
	const handleChangeText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setText(e.target.value)
	}

	const handleFetchMessages = () => {
		const newMessage = { role: EngineRole.user, content: text || '' }
		dispatch(add(newMessage));
		dispatch(fetchMessages({
			messages: [...chatMessages, newMessage],
			params: engParams.config[engineCurrent] as EngineParams
		}));
	}

	const changeEngineCallback = useCallback((engNum: number) => {
		dispatch(changeEngine(engNum));
	}, [dispatch]);

	const changeModelCallback = useCallback((modelNum: number) => {
		dispatch(changeModel(modelNum));
	}, [dispatch])

	return (<div className="flex flex-col mt-10">
		<Header />
		<div>{available[current]}</div>
		<MessagesBlock />
		<div className="flex">
		<DropDown {...{ items: enginesNamesList, current: engParams.currentEngine, changeCallback: changeEngineCallback }} />
		<DropDown {...{ items: available, current, changeCallback: changeModelCallback }} />
		</div>
		<button className="p-3 bg-red-900" onClick={handleFetchMessages}>Click</button>
		<textarea className="text-black p-4" name="Message" id="input-message" onChange={handleChangeText}></textarea>
	</div>)
}

export default ChatPage;