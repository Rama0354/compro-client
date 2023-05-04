import styles from '../../style'
import { SkeletonAbout } from '../Skeletone'

function About({setting,loading}) {
    return (
        <div className='w-full bg-white p p-6 mb-6 sidebar'>
            <div className='w-full pb-3 mb-3 border-b border-slate-200'>
                <h2 className={`${styles.heading2} text-center`}>Tentang Kami</h2>
            </div>
            {loading ? 
                <>
                    <SkeletonAbout/>
                </>
            : <div className={`${styles.paragraph}`} dangerouslySetInnerHTML={{__html: setting?.description}}></div>
            }
        </div>
    )
}

export default About