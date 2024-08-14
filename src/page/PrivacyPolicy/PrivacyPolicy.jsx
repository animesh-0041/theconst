import { privacypolicy } from '../../assets/static';
import { ContentComponent } from '../../components/ContentComponent/ContentComponent';
import { Layout } from '../../components/layout/Layout';


export const PrivacyPolicy = () => {

    return (
        <Layout>
            <ContentComponent contents={privacypolicy} />
        </Layout>
    )
}