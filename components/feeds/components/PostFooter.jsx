

export default function PostFooter({ data }) {

    const smallStyle = 'mr-2 min-w-[50px]'

    return (
        <div className="flex">
            <small className={smallStyle}>loves {data?.loves?.length || ''}</small>
            <small className={smallStyle}>likes {data?.likes?.length || ''}</small>
        </div>
    )
}