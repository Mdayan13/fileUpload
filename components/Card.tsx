import Link from 'next/link'
import { FormatDateTime } from './FormatDateTime'
import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import { convertFileSize } from '@/lib/utils'
import {ActionDropDown} from './ActionDropDown'

export const Card = ({file}:{file: Models.Document}) => {
  return (
    <Link href={file.url} target='_blank' className='file-card'>
     <div className='flex justify-between'>
          <Thumbnail 
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName='!size-15'
          />
          <div className='flex flex-col justify-between items-end'>
               <ActionDropDown file={file} />
               <p className='body-1'>{convertFileSize(file.size)}</p>
          </div>
     </div>
     <div className='file-card-details'>
          <p className='subtitle-2 line-clamp-1'>
    {file.name}
          </p>
          <FormatDateTime date={file.$createdAt} className="body-2 text-light-100" />
          <p className='caption line-clamp-1 text-light-200'>by: {file.owner.fullName}</p>
     </div>
    </Link>
  )
}

export default Card






// {
//       name: 'WIN_20250630_18_04_28_Pro.jpg',
//       url: 'https://syd.cloud.appwrite.io/v1/storage/buckets/68a4cbbd001ad0f58332/files/68a9bddd000299668c16/view?project=undefined',
//       type: 'image',
//       bucketFileId: '68a9bddd000299668c16',
//       accountId: '68a85b50001914dbe0c1',
//       extension: 'jpg',
//       users: [],
//       size: 137050,
//       '$id': '68a9bddd0035ca25fd29',
//       '$sequence': 6,
//       '$createdAt': '2025-08-23T13:10:54.517+00:00',
//       '$updatedAt': '2025-08-23T13:10:54.517+00:00',
//       '$permissions': [],
//       owner: [Object],
//       '$databaseId': '68a4c5960000d9102d22',
//       '$collectionId': '68a4c7d4001f1efb390f'
//     }