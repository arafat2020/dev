
"use client"

import React from 'react'
import { Doc } from '../../../../../../convex/_generated/dataModel';
import useOrigin from '@/hooks/useOrigin';

interface PublishProp {
    initialDocument: Doc<"document">
}

function Publish({}:PublishProp) {
    const origin = useOrigin();
  return (
    <div>Publish</div>
  )
}

export default Publish