import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { regime, profission } from "@/lib/profission-regim";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insurentProfileFormState } from "../Form";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { MouseEventHandler } from "react";

function InsurentProfile({
  insurentProfileForm,
  handleSubmit,
  handlePrevious,
}: {
  insurentProfileForm: UseFormReturn<insurentProfileFormState>;
  handleSubmit: SubmitHandler<insurentProfileFormState>;
  handlePrevious: MouseEventHandler;
}) {
  return (
    <Form {...insurentProfileForm}>
      <form
        className="space-y-5"
        onSubmit={insurentProfileForm.handleSubmit(handleSubmit)}
      >
        <div className="space-y-5">
          <FormField
            control={insurentProfileForm.control}
            name="secteurActivite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre secteur d'activité</FormLabel>
                <FormControl>
                  <Input
                    placeholder="saisair votre secteur d'activité"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={insurentProfileForm.control}
            name="socialRegime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre régime social</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regime.map((r) => (
                      <SelectItem className="cursor-pointer" value={r} key={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={insurentProfileForm.control}
            name="profission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre profession</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {profission.map((p) => (
                      <SelectItem className="cursor-pointer" value={p} key={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center">
          <Button type="button" variant={"secondary"} onClick={handlePrevious}>
            Précédent{" "}
          </Button>
          <Button type="submit">Suivant</Button>
        </div>
      </form>
    </Form>
  );
}

export default InsurentProfile;
