import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { createPropertyAction } from "@/utils/actions";
import { SubmitButton } from "@/components/form/Buttons";
import PriceInput from "@/components/form/PriceInput";

function CreateProperty() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create property
      </h1>
      <div className="border p-8 rounded-md">
        <h3 className="text-lg mb-4 font-medium">General info</h3>
        <FormContainer action={createPropertyAction}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name (20 limint)"
              defaultValue="Austria"
            />
            <FormInput
              name="tagline"
              type="text"
              label="Tagline (30 limint)"
              defaultValue="Dream getaway awaits you here"
            />
            {/* price */}
            <PriceInput />
            {/* categories */}
          </div>
          {/* text area/description */}
          <SubmitButton
            text="create rental"
            className="mt-12"
            size={"default"}
          />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProperty;
