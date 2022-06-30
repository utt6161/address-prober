
export interface IProperty {
    source: string,
    addString: string,
    pmUDPRN: number,
    pTown: string,
    pPostcodeType: string,
    pDPS: string,
    pBuildName: string,
    pBuildNo: number,
    lines: {
        addLine1: string,
        addLine2: string,
        addPostTown: string,
        addPostcode: string
    }
}

export interface IApiResponse {
    status: boolean,
    misc?: {
        processingTime: number,
        server: string,
        creditBalance: number
    },
    data?: IProperty[],
    error?: string

} 