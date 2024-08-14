import { Projects } from "./Projects";
import { stuctures } from '../../../assets/Stuctures/Stuctures'


export const About = ({ profileData }) => {

    const aboutListManage = (about) => {
        switch (about.name) {
            case "skills":
                return <div className="w-full flex flex-wrap gap-2">
                    {profileData && profileData[about.name]?.map((item, ind) => (
                        <div key={ind} className="w-fit py-1 px-3 hover:bg-black-50 bg-black-25 rounded-full font-Golos font-normal text-xs leading-4 text-black-500 cursor-pointer">{item}</div>
                    ))}

                    {profileData && profileData[about.name]?.length === 0 && <p className="font-Golos font-normal text-xs md:text-sm leading-4 text-black-500">---</p>}
                </div>
            case 'projects':
                return <Projects />
            default:
                return <>
                    {about?.value?.map((item, ind) => (
                        <div key={ind} className="w-full flex flex-row items-center gap-4">
                            <span>{item.icon}</span>
                            <p className={`font-Golos font-normal text-xs md:text-sm leading-4 text-black-500 ${item.name !== 'email' && "capitalize"}`}>{profileData && profileData[item.name] || '---'}</p>
                        </div>
                    ))}
                </>
        }
    }

    return (
        <div className="w-full flex flex-col gap-4">
            {stuctures && stuctures?.AboutList?.map((about, index) => (
                <div key={index} className="w-full flex flex-col gap-4 px-2 py-4">
                    <h2 className="font-Golos font-semibold text-base leading-5 text-black-700 capitalize">{about.name}</h2>

                    <div className={`w-full flex ${about.name === 'skills' ? 'flex-row gap-2' : 'flex-col gap-4'}`}>
                        {aboutListManage(about)}
                    </div>
                </div>
            ))}

        </div>
    )
}