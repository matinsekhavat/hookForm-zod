import { useForm } from "react-hook-form";
function Users() {
  //   const [input, setInput] = useState<string>("");
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  function handleEmail(formData) {
    console.log(formData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleEmail)}>
        <input
          {...register("email", {
            required: {
              message: "email is required",
              value: true,
            },
            maxLength: {
              message: "Too many characters",
              value: 8,
            },
          })}
          placeholder="email"
        />
      </form>
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
    </div>
  );
}

export default Users;

// instead of passing onChange onBlur ref ... we pass {...register}
