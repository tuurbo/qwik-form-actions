import { component$ } from "@builder.io/qwik";
import {
  globalAction$,
  routeAction$,
  routeLoader$,
  z,
} from "@builder.io/qwik-city";
import { InitialValues, formAction$, useForm } from "@modular-forms/qwik";

export const useAction = globalAction$((values, event) => {
  console.log("useAction...");
  throw event.redirect(302, "/");
});

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Please enter your email."),
});

type LoginForm = z.input<typeof loginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => {
  console.log("formLoader...");
  return {
    email: "test@example.com",
  };
});

export const useFormAction = formAction$<LoginForm>(async (values, event) => {
  console.log("useFormAction...");
  throw event.redirect(302, "/");
});

export default component$(() => {
  const action = useAction();

  const [loginForm, { Form }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
  });

  return (
    <div style="padding: 50px">
      <strong>Login Page</strong>
      <br />
      <br />
      <button
        type="button"
        onClick$={() => {
          action.submit();
        }}
      >
        login (qwik)
      </button>
      <br />
      <br />
      <Form onSubmit$={() => {}}>
        <button
          type="submit"
          onClick$={() => {
            //   action.submit();
          }}
        >
          login (modular)
        </button>
      </Form>
    </div>
  );
});
