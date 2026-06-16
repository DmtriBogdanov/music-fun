import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types";
import {baseApi} from "@/app/api/baseApi";

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
    })
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation
} = playlistsApi