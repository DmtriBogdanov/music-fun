import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types";
import s from './PlaylistItem.module.css'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import {
  useUploadPlaylistCoverMutation
} from "@/features/playlists/api/playlistsApi";
import type {ChangeEvent} from "react";

type Props = {
  playlist: PlaylistData
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, editPlaylist, deletePlaylist }: Props) => {
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()

  const originalCover = playlist.attributes.images.main.find(img => img.type == 'original')
  const src = originalCover ? originalCover.url : defaultCover

  const uploadCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024 // 1 MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    const file = e.target.files?.length && e.target.files[0]
    if(!file) return

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG or GIF images are allowed')
      return
    }

    if (file.size > maxSize) {
      alert(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`)
      return
    }

    uploadPlaylistCover({ playlistId: playlist.id, file })
  }


  return (
    <div>
      <img src={src} alt="cover" width="240px" className={s.cover}/>
      <input type="file" accept={"image/jpeg,image/png,image/gif"} onChange={uploadCoverHandler}/>
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </div>
  )
}