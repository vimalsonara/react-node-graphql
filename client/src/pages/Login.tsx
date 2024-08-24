import { useAuth } from "@/components/Auth";
import { graphql } from "@/gql";
import { LoginUserMutation, LoginUserMutationVariables } from "@/gql/graphql";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";

const loginMutation = graphql(`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      success
      message
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`);

import { useState } from "react";
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation<
    LoginUserMutation,
    Error,
    LoginUserMutationVariables
  >({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      request<LoginUserMutation, LoginUserMutationVariables>(
        import.meta.env.VITE_API_URL,
        loginMutation,
        {
          email,
          password,
        },
      ),
    onSuccess: (response) => {
      if (response.loginUser.user) {
        login(response.loginUser.user);
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
