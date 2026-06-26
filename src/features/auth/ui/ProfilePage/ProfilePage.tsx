import {useGetMeQuery} from "@/features/auth/api/authApi";

export const ProfilePage = () => {
  const { data } = useGetMeQuery()

  return <h1>{data?.login} page</h1>
}