import { classNames } from '../../lib/classNames/classNames'
import { Loader } from '../Loader/Loader'
import cls from './PageLoader.module.scss'

interface PageLoaderProps {
    className?: string
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
)
