import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insurentsFormState } from "../Form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MouseEventHandler } from "react";

function InsuranceMemebers({
  insurentsForm,
  handleSubmit,
  handlePrevious,
}: {
  insurentsForm: UseFormReturn<insurentsFormState>;
  handleSubmit: SubmitHandler<insurentsFormState>;
  handlePrevious: MouseEventHandler;
}) {
  return (
    <Form {...insurentsForm}>
      <form
        className="space-y-5"
        onSubmit={insurentsForm.handleSubmit(handleSubmit)}
      >
        <div className="space-y-5">
          <FormField
            control={insurentsForm.control}
            name="insuredAdultes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre d'adulte(s) à assurer </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="saisair le nombre d'adulte(s) à assurer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={insurentsForm.control}
            name="insuredChildren"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre d'enfant(s) à assurer</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="saisair le nombre d'enfant(s) à assurer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center">
          <Button type="button" variant={"secondary"} onClick={handlePrevious}>
            Précédent
          </Button>
          <Button type="submit">Soumettre</Button>
        </div>
      </form>
    </Form>
  );
}

export default InsuranceMemebers;
