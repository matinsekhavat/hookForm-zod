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

for work with forms + zod :
at First we need to define Schema for each form

for example in :
`/users/userSchema.ts`

```typescript
export const emailPattern = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

import { z } from "zod";
export const schema = z.object({
  name: z.string().min(1, { message: "required" }), //should be string and the filed cannot less than 1 word
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .refine((emailValue) => {
      //validate text to a Email
      return emailPattern.email.test(emailValue);
    }), //with refine we create custom validation
});
```
