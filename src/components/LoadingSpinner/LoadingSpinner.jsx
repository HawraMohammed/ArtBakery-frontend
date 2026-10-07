import './LoadingSpinner.css'

function LoadingSpinner() {
    return (
        <div className="loading-container">
            <div className="spinner-border loading-spinner" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner