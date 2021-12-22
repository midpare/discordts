export interface ApiType {
  uri: string
  method: string
  json?: boolean
}


export interface SchoolApiType extends ApiType{
  qs: SchoolQs
}

interface SchoolQs {
  KEY: string
  ATPT_OFCDC_SC_CODE: string, 
  SD_SCHUL_CODE?: string, 
  GRADE?: string, 
  CLASS_NM?: string,
  SCHUL_NM?: string
  ALL_TI_YMD?: string
  MLSV_YMD?: string
  AY?: string
}
