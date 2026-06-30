function Loader ({ texto = "CARGANDO..."}) {
    const Huella = ( {className}) => (
        <svg className={className} viewBox="0 0 64 64 " width="34"
        height="34" aria-hidden="true">
            <ellipse cx="32" cy="42" rx="15" ry="12" />
            <ellipse cx="13" cy="24" rx="6" ry="8" />
            <ellipse cx="26" cy="15" rx="6" ry="8.5" />
            <ellipse cx="40" cy="15" rx="6" ry="8.5" />
            <ellipse cx="52" cy="24" rx="6" ry="8" />
        </svg>
    )

    return (
        <div className="vet-loader" role="status" aria-live="polite">
            <div className="vet-loader-box">
                <div className="vet-loader-dog" aria-hidden="true">
                    <svg viewBox="0 0 120 90" width="120" height="90">
                        <g className="vet-dog-body" fill="currentColor">
                            <ellipse cx="60" cy="45" rx="34" ry="20" />
                            <circle  cx="94" cy="34" r="16" />
                            <ellipse cx="108" cy="38" rx="8" ry="6" />
                            <path d="M86 20 q-6 -14 -16 -10 q4 12 16 16 Z" />
                            <path className="vet-dog-tail" d="M26 38 q-16 -6 -20 -20
                            q12 4 22 14 Z" />
                            <circle cx="98" cy="30" r="2.5" fill="#fff" />
                        </g>
                        <g fill="currentColor">
                            <rect className="vet-dog-leg leg1" x="40" y="60"
                            width="7" height="22" rx="3" />
                            <rect className="vet-dog-leg leg2" x="54" y="60"
                            width="7" height="22" rx="3" />
                            <rect className="vet-dog-leg leg3" x="70" y="60"
                            width="7" height="22" rx="3" />
                            <rect className="vet-dog-leg leg4" x="84" y="60" 
                            width="7" height="22" rx="3" />
                        </g>
                    </svg>
                </div>

                <div className="vet-loader-huellas">
                    <Huella className="vet-huella h1" />
                    <Huella className="vet-huella h2" />
                    <Huella className="vet-huella h3" />
                    <Huella className="vet-huella h4" />
                </div>
                <p className="vet-loader-texto">
                    {texto}
                </p>
            </div>
        </div>
    )
}

export default Loader