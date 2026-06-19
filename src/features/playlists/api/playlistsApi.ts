import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types";
import {baseApi} from "@/app/api/baseApi";
import type {Images} from "@/common/types";

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => `playlists`,
      providesTags: ['Playlist']
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: ({title, description}) => ({
        url: 'playlists',
        method: 'POST',
        body: {
          data: {
            type: 'playlists',
            attributes: {
              title,
              description,
            },
          },
        },
      }),
      invalidatesTags: ["Playlist"]
    }),
    deletePlaylist: build.mutation<void, string>({
      query: playlistId => ({
        url: `playlists/${playlistId}`,
        method: 'delete'
      }),
      invalidatesTags: ["Playlist"]
    }),
    updatePlaylist: build.mutation<void, { playlistId: string; payload: UpdatePlaylistArgs }>({
      query: ({playlistId, payload}) => ({
        url: `playlists/${playlistId}`,
        method: 'put',
        body: {
          data: {
            type:'playlists',
            attributes:payload
          }
        }
      }),
      invalidatesTags: ["Playlist"]
    }),
    uploadPlaylistCover: build.mutation<Images, {playlistId: string, file: File}>({
      query: ({playlistId, file}) => {
        const formData = new FormData()
        formData.append("file", file)
        return ({
          url: `playlists/${playlistId}/images/main`,
          method: 'post',
          body: formData
        });
      },
      invalidatesTags: ["Playlist"]
    }),
    deletePlaylistCover: build.mutation<void, {playlistId: string}>({
      query: ({playlistId}) => ({url: `playlists/${playlistId}/images/main`, method: 'delete',}),
      invalidatesTags: ["Playlist"]
    })
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation
} = playlistsApi