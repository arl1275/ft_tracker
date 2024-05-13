export const Loadingbar = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 4,
            width: '100%'
        }}>
            <div className="progress">
                <div className="progress-bar progress-bar-indeterminate bg-purple"></div>
            </div>
        </div>
    )
}