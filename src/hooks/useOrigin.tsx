
"use Client"

import React, { useEffect, useState } from 'react'

function useOrigin() {
    const [mounted, setMounted] = useState<boolean>(false);
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""
    useEffect(() => {
        setMounted(true)
    }, [])
    if (mounted) {
        return origin
    }

    return ""
}

export default useOrigin