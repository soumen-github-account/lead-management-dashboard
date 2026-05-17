import { useForm } from "react-hook-form";

import API from "../api/axios";

import { useDispatch } from "react-redux";

import { setCredentials } from "../features/auth/authSlice";

import toast from "react-hot-toast";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

type LoginFormData = {
  email: string;

  password: string;
};

const LoginPage = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    register,
    handleSubmit,
  } =
    useForm<LoginFormData>();

  const onSubmit =
    async (
      data: LoginFormData
    ) => {

      try {

        const res =
          await API.post(
            "/auth/login",
            data
          );

        dispatch(
          setCredentials({
            token:
              res.data.token,

            user:
              res.data.user,
          })
        );

        if (
          res.data.user.role ===
          "admin"
        ) {
          navigate(
            "/dashboard"
          );
        }

        if (
          res.data.user.role ===
          "leader"
        ) {
          navigate(
            "/leader"
          );
        }

        if (
          res.data.user.role ===
          "sales"
        ) {
          navigate(
            "/sales"
          );
        }

        toast.success(
          "Login Success"
        );

      } catch (error) {

        toast.error(
          "Login Failed"
        );
      }
    };

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      navigate(
        "/dashboard"
      );
    }

  }, []);

  return (
    <div
      className="
        min-h-screen
        bg-zinc-100 dark:bg-black
        flex
      "
    >

      {/* LEFT SIDE */}
      <div
        className="
          hidden lg:flex
          flex-1
          relative
          overflow-hidden
          bg-black
          text-white
          p-14
          flex-col
          justify-between
        "
      >

        {/* BACKGROUND */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-zinc-900
            via-black
            to-zinc-800
          "
        />

        {/* CIRCLES */}
        <div
          className="
            absolute -top-20 -right-20
            w-80 h-80
            rounded-full
            bg-white/5
          "
        />

        <div
          className="
            absolute bottom-0 left-0
            w-72 h-72
            rounded-full
            bg-white/5
          "
        />

        {/* CONTENT */}
        <div className="relative z-10">
            <div
              className="
                w-16 h-16
                rounded-3xl
                bg-white/10
                backdrop-blur-xl
                flex items-center justify-center
                mb-8
              "
            >
              <ShieldCheck size={32} />
            </div>
          <h1
            className="
              text-6xl
              font-bold
              leading-tight
              tracking-tight
            "
          >
            GigFlow - Smart Leads Dashboard
          </h1>

          <p
            className="
              mt-6
              text-xl
              text-zinc-300
              max-w-xl
              leading-relaxed
            "
          >
            Manage your leads,
            track conversions and
            grow your sales team
            with a modern CRM
            dashboard experience.
          </p>

        </div>

        {/* BOTTOM CARD */}
        <div
          className="
            relative z-10
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            rounded-3xl
            p-6
            max-w-md
          "
        >

          <p className="text-zinc-300 text-sm">
            Trusted by growing teams
          </p>

          <div
            className="
              flex items-center gap-6
              mt-5
            "
          >

            <div>
              <h2 className="text-3xl font-bold">
                12K+
              </h2>

              <p className="text-zinc-400 text-sm">
                Leads Managed
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                98%
              </h2>

              <p className="text-zinc-400 text-sm">
                Success Rate
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div
        className="
          flex-1
          flex items-center justify-center
          p-6 md:p-10
        "
      >

        <div
          className="
            w-full
            max-w-md
          "
        >

          {/* MOBILE LOGO */}
          <div className="lg:hidden mb-10 text-center">

            <h1 className="text-4xl font-bold">
              Smart Leads
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              CRM Dashboard
            </p>

          </div>

          {/* LOGIN CARD */}
          <div
            className="
              bg-white dark:bg-zinc-950
              border border-zinc-200 dark:border-zinc-800
              rounded-[32px]
              p-8 md:p-10
              shadow-xl
            "
          >

            <div className="mb-8 dark:text-zinc-200">

              <h2 className="text-4xl font-bold tracking-tight">
                Welcome Back
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 mt-3">
                Login to continue to
                your dashboard.
              </p>

            </div>

            <form
              onSubmit={
                handleSubmit(
                  onSubmit
                )
              }

              className="space-y-5 dark:text-zinc-200"
            >

              {/* EMAIL */}
              <div>

                <label className="text-sm font-medium mb-2 block">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}

                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-zinc-400
                    "
                  />

                  <input
                    type="email"

                    placeholder="admin@gmail.com"

                    {...register(
                      "email"
                    )}

                    className="
                      w-full
                      bg-zinc-100 dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      rounded-2xl
                      pl-11 pr-4 py-3.5
                      outline-none
                      focus:ring-2 focus:ring-black dark:focus:ring-white
                    "
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="text-sm font-medium mb-2 block">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}

                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-zinc-400
                    "
                  />

                  <input
                    type="password"

                    placeholder="admin1234"

                    {...register(
                      "password"
                    )}

                    className="
                      w-full
                      bg-zinc-100 dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      rounded-2xl
                      pl-11 pr-4 py-3.5
                      outline-none
                      focus:ring-2 focus:ring-black dark:focus:ring-white
                    "
                  />

                </div>

              </div>

              {/* BUTTON */}
              <button
                className="
                  w-full
                  flex items-center justify-center gap-2
                  bg-black dark:bg-white
                  dark:text-black
                  text-white
                  py-3.5
                  rounded-2xl
                  font-semibold
                  hover:scale-[1.01]
                  transition-all duration-200
                "
              >

                Login

                <ArrowRight
                  size={18}
                />

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;