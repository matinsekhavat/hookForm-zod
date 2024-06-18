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
    .refine((emailValue) => emailPattern.email.test(emailValue), {
      message: "Email Not Valid",
    }), //with refine we create custom validation - //validate text to a Email
});

export type Schema =  z.infer(typeof schema)
```

now it's time make a connection between a Schema and a generic(TS)
the freat things about zod is you can easily convert `Schemas` to `Types`

```javascript
export type Schema =  z.infer(typeof schema)
```

- This line is using a feature of TypeScript called "type inference" to create a type alias for the schema.

Here's a breakdown of what's happening:

1. z.infer: This is a function provided by the zod library that infers the type of a schema.
2. typeof schema: This gets the type of the schema object, which is an instance of z.Object.
3. export type Schema = ...: This creates a type alias named Schema and assigns it the inferred type.

   In other words, this line is saying: "Hey, take the type of the schema object and create a type alias called Schema that represents it."

By using z.infer, we can get the type of the schema without having to manually define it. This is useful because the schema is defined using the zod library, which provides a lot of functionality for building and validating schemas.

The resulting Schema type will be an object type that represents the shape of the data that the schema validates. For example, in this case, the Schema type might look something like this:
This type alias can then be used throughout the codebase to type-check objects that conform to the schema.

By using z.infer, we can keep our type definitions in sync with the schema definition, which helps to ensure that our code is type-safe and maintainable.

---

now you can simply use this `x`:

```javascript
export type x =  z.infer(typeof schema)

```

in:

```javascript
import { x } from "./types/schema";
const { register } = useForm < x > { mode: "all" };

//now it's suggest from intellisens

<TextField {...register("")}>
```

---

### resolver in useForm()

so in last lecture we talked about how our `{...register("")}` just know the intellisense
but for better connection we need resolver

```javascript
import { zodResolver } from "@hookform/resolvers";

const { register } =
  useForm <
  x >
  {
    mode: "all",
    resolver: zodResolver(schema),
  };

//x vs schema : lecture we define schema we have export name and export type
//export type(Schema) gonna to sit in generic type
//export name(schema) gonna to sit in zodResolver(schema) like this
```
