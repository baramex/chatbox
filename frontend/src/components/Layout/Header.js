import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, resetSession, USERS_TYPE } from "../../lib/service/authentification";
import HiddenTab from "../Misc/HiddenTab";

export default function Header({ onlineCount, onlines, openProfileViewer, avatar, integrationId }) {
    const burger = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (!burger.current) return;

        const currentBurger = burger.current;

        const burgerCallback = (event) => {
            event.stopPropagation();
            const active = currentBurger.parentElement.classList.toggle("active");
            const tab = document.getElementById("burger-tab");
            if (tab) {
                if (active) {
                    tab.hidden = false;
                    tab.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
                }
                else {
                    tab.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300 }).onfinish = () => tab.hidden = true;
                }
            }
        }

        currentBurger.addEventListener("click", burgerCallback);

        return () => {
            currentBurger.removeEventListener("click", burgerCallback);
        }
    }, [burger]);

    return (<>
        <header className="text-center relative flex justify-between items-center px-3 bg-emerald-600">
            <div className="w-full">
                <div className="py-2 px-3 justify-start items-center hidden md:flex">
                    <span className="flex relative h-3 w-3 mr-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    <span className="text-white text-lg">{((onlineCount || onlineCount === 0) ? onlineCount : "--") + " en ligne"}</span>
                </div>

                <div className="burger md:hidden">
                    <button ref={burger} className="relative w-full h-full bg-transparent border-0 p-0 outline-none">
                        <span></span>
                    </button>

                    <ul className="menu absolute top-0 left-0 pt-5 px-0 rounded-0 text-left">
                        <li className="flex items-center mt-12 px-3">
                            <img width="55" height="55" className="rounded-full bg-emerald-100 object-cover aspect-square" src={avatar || "/images/user.png"} alt="account-menu" />
                            <p className="font-bold text-lg ml-3 text-white m-0 grow">{sessionStorage.getItem("username")}</p>
                            <button className="bg-transparent border-0" onClick={() => openProfileViewer(sessionStorage.getItem("id"))}><Cog8ToothIcon width="25" className="stroke-white"/></button>
                        </li>
                        <li className="px-3">
                            {
                                Number(sessionStorage.getItem("type")) === USERS_TYPE.ANONYME ? <Link to={"/login" + (integrationId ? "?to=/integrations/" + integrationId : "")}>connectez-vous</Link> : Number(sessionStorage.getItem("type")) === USERS_TYPE.OAUTHED ? null : <button onClick={e => handleLogout(e, integrationId, navigate)} className="transition-colors bg-red-600 text-white rounded-3xl w-full hover:bg-red-700 py-2 mt-3 mb-2 hover:bg-red-700">Se déconnecter</button>
                            }
                        </li>
                        <li className="mb-2 mt-4 px-3"><span className="text-white text-lg">{((onlineCount || onlineCount === 0) ? onlineCount : "--") + " en ligne"}</span></li>
                        {
                            onlines && onlines.map(online => <li role="button" onClick={() => openProfileViewer(online.id)} className="online flex items-center py-2 px-4 hover:bg-white/25" key={online.id}>
                                <img width="50" height="50" className="rounded-full object-cover aspect-square" src={online.id === sessionStorage.getItem("id") ? avatar || "/images/user.png" : `/profile/${online.id}/avatar`} alt="avatar" />
                                <p className="mb-0 ml-2 text-white">{online.username}</p>
                            </li>)
                        }
                    </ul>
                </div>
            </div>

            <h1 className="text-4xl py-1 font-bold text-white mb-1.5 sm:text-5xl">ChatBlast</h1>

            <div className="w-full text-right hidden sm:block">
                <button onClick={() => openProfileViewer(sessionStorage.getItem("id"))} className="px-0 py-1 rounded-full bg-transparent h-16">
                    <img className="rounded-full bg-emerald-100 h-full aspect-square object-cover" src={avatar || "/images/user.png"} alt="account-menu" />
                </button>
            </div>
        </header>

        <HiddenTab id="burger-tab" zIndex={"z-10"} hidden />
    </>);
}

async function handleLogout(event, integrationId, navigate) {
    event.target.disabled = true;
    try {
        await logoutUser();
        resetSession();
        navigate("/login" + (integrationId ? "?to=/integrations/" + integrationId : ""));
    } catch (error) {
        event.target.disabled = false;
        console.error(error);
    }
}