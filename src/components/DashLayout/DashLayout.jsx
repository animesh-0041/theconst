import { Layout } from "../../components/layout/Layout"
import { SideBar } from "../../components/SideBar/SideBar"


export const DashLayout = ({ children }) => {

    return (
        <Layout>
            <div className="w-full h-screen m-auto px-4 sm:px-10 md:px-12 pt-2 md:pt-8 flex flex-row gap-10 justify-between">
                <div id="hide_scrollbar" className="w-full h-full flex flex-col gap-10 overflow-y-scroll">
                    {children}
                </div>

                <div className="hidden lg:block w-[1px] h-full border border-black-25"></div>

                <div className="hidden lg:block w-[400px] h-full">
                    <SideBar />
                </div>
            </div>
        </Layout>
    )
}