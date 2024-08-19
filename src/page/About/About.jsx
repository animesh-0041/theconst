import { aboutpolicy } from "../../assets/static"
import { ContentComponent } from "../../components/ContentComponent/ContentComponent"
import { Layout } from "../../components/layout/Layout"



export const About = () => {

    return (
        <Layout>
            <ContentComponent contents={aboutpolicy} />
        </Layout>
    )
}