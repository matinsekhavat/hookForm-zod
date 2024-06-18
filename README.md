### Zod + react hook form

we need this Packages

1. react-hook-form
2. zod
3. @hookform/resolvers

```javascript
const {
  getValues,
  register,
  handleSubmit,
  formState: { errors },
} = useForm < { email: string } > { mode: "onBlur" };
```

in this system when we use mode we can handle mode (handleSubmith) withot define real function

```javascript
import { useForm } from "react-hook-form";
function Users() {
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
```

but when our Inputs get more complex we add zod into story.
