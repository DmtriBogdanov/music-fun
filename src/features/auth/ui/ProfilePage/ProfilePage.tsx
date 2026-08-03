import {useGetMeQuery} from "@/features/auth/api/authApi";
import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import {
  PlaylistsList
} from "@/features/playlists/ui/PlaylistsPage/PlaylistsList/PlaylistsList";
import {
  CreatePlaylistForm
} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm";
import s from './ProfilePage.module.css'
import {Navigate} from "react-router";
import {Path} from "@/common/routing";

export const ProfilePage = () => {
  const {data: meResponse, isLoading: isMeLoading} = useGetMeQuery()

  const {data: playlistResponse, isLoading} = useFetchPlaylistsQuery({
    userId: meResponse?.userId}, {skip: !meResponse?.userId})

  if (isLoading || isMeLoading) return <h1>Skeleton loader...</h1>

  if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />

  return (
    <div>
      <h1>{meResponse?.login} page</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistsList
          playlists={playlistResponse?.data || []}
          isPlaylistsLoading={isLoading}
        />
      </div>

    </div>

  )

}