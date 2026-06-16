import {
  CreatePlaylistForm
} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm";
import type {
  PlaylistData,
  UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery
} from "@/features/playlists/api/playlistsApi";

import s from './PlaylistsPage.module.css'
import {
  PlaylistItem
} from "@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem";
import {
  EditPlaylistForm
} from "@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm";

export const PlaylistsPage = () => {
  // 1
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>()

  const {data} = useFetchPlaylistsQuery()
  const [deletePlaylist] = useDeletePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId)
    }
  }

  // 3, 5
  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map(t => t.id),
      })
    } else {
      setPlaylistId(null)
    }
  }


  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map(playlist => {
          // 2
          const isEditing = playlistId === playlist.id

          return (
            <div
              className={s.item}
              key={playlist.id}
            >
              {isEditing ? (
                <EditPlaylistForm
                  playlistId={playlistId}
                  register={register}
                  handleSubmit={handleSubmit}
                  editPlaylist={editPlaylistHandler}
                  setPlaylistId={setPlaylistId}
                />
              ) : (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylist={deletePlaylistHandler}
                  editPlaylist={editPlaylistHandler}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}