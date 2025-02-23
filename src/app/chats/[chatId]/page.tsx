"use client"
import React from "react";
import Header from "@/components/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, example} from "@/redux/store";
import {increment, setValue} from "@/redux/slice";

const ChatPage: React.FC = () => {
	const examp = useSelector(example);
	const dispatch = useDispatch<AppDispatch>();

	const handleIncrement = () => {
		dispatch(increment())
	}

	const handleSet = () => {
		dispatch(setValue(100))
	}

	return (<div className="flex flex-row mt-10">
		<Header/>
		<div>{examp}</div>
		<button
			className="p-2 bg-red-500 text-white rounded"
			onClick={handleIncrement}
		>
			Increment
		</button>
		<button
			className="p-2 bg-red-500 text-white rounded"
			onClick={handleSet}
		>
			SetVal
		</button>
	</div>)
}

export default ChatPage