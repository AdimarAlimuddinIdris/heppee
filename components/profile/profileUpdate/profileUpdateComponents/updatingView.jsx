

export default function UpdatingProfileView({ updating }) {
    if (!updating) return null;
    return (
        <div className="flex popup-div">
            <div className="bg-white p-5 m-3 rounded-md shadow-md m-auto">
                <h1>Updating Profile ...</h1>
            </div>
        </div>
    )
}