import OperationArticle from '@/conponents/OperationArticle'
import { useStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Compile() {
    const { compileStore } = useStore()

    const [params] = useSearchParams()
    const articleId = params.get('id') || compileStore.getCompileId()
    const pubFlag = params.get('pubFlag')
    if (articleId) {
        compileStore.setCompileId(articleId)
    } else if (pubFlag) {
        compileStore.setCompileId('')
    }
    // const navigate = useNavigate()
    return (
        <>
            <OperationArticle articleId={articleId} />
        </>
    )
}
