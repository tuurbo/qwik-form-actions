import { component$ } from "@builder.io/qwik";
import { globalAction$, routeAction$ } from "@builder.io/qwik-city";

export const useAction = globalAction$((values, event) => {
  console.log("useAction...");
  throw event.redirect(302, "/cart/");
//   return {};
});

export default component$(() => {
  const action = useAction();
  return (
    <div style="padding: 50px">
      Login<br /><br />
      <button
        type="button"
        onClick$={() => {
          action.submit();
        }}
      >
        fake login
      </button>
    </div>
  );
});
