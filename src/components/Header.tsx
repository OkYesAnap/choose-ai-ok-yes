"use client"

import React from "react";
import {headerLinks, routeHeader} from "@/constants/header";
import Link from "next/link";
import {useParams} from "next/navigation";


const Header: React.FC = () => {

	const {chatId} = useParams();

	const links = routeHeader.filter(routeParam => headerLinks.has(routeParam.route));
	return (<header className="fixed top-0 left-1/2 z-10 flex flex-row justify-center -translate-x-1/2">
		<div className="shadow bg-gray-800 gap-4 border border-white rounded-10 p-2 m-2">
		{links.map(routeParam => {
			const active = chatId === routeParam.route;
			return (  <Link className={`max-w-xs p-1 ${active ? "border border-white rounded-10" : ""}`}
			                href={`/chats/${routeParam.route}`} key={routeParam.route}>
					{routeParam.title}
			</Link>)
		})}
		</div>
	</header>)
};

export default Header;