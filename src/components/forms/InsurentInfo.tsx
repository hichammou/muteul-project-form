import { SubmitHandler, UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InsurentInfoFormState } from "../Form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";

function InsurentInfo({
  insurentInfoForm,
  handleSubmit,
}: {
  insurentInfoForm: UseFormReturn<InsurentInfoFormState>;
  handleSubmit: SubmitHandler<InsurentInfoFormState>;
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  return (
    <Form {...insurentInfoForm}>
      <form
        className="space-y-5"
        onSubmit={insurentInfoForm.handleSubmit((data) => {
          console.log(3232);

          handleSubmit(data);
        })}
      >
        <div className="space-y-5">
          <FormField
            control={insurentInfoForm.control}
            name="insurentFName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre prénom</FormLabel>
                <FormControl>
                  <Input placeholder="saisair votre prénom" {...field} />
                </FormControl>
                {insurentInfoForm.formState.errors.insurentFName && (
                  <>
                    <p className="text-xs text-red-500 font-medium">
                      Le prénom doit comporter au moins 6 caractères
                    </p>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={insurentInfoForm.control}
            name="insurentLName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre nom</FormLabel>
                <FormControl>
                  <Input placeholder="saisair votre nom" {...field} />
                </FormControl>
                {insurentInfoForm.formState.errors.insurentLName && (
                  <>
                    <p className="text-xs text-red-500 font-medium">
                      Le nom doit comporter au moins 6 caractères
                    </p>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={insurentInfoForm.control}
            name="insurentCivilite"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Votre Civilité</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Madame" />
                      </FormControl>
                      <FormLabel className="font-normal">Madame</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Monsieur" />
                      </FormControl>
                      <FormLabel className="font-normal">Monsieur </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                {insurentInfoForm.formState.errors.insurentCivilite && (
                  <>
                    <p className="text-xs text-red-500 font-medium">
                      Ce champ et oubligatoire
                    </p>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={insurentInfoForm.control}
            name="insurentBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>date de naissance</FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      defaultMonth={field.value}
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setIsCalendarOpen(false);
                      }}
                      fromYear={1900}
                      toYear={2000}
                    />
                  </PopoverContent>
                </Popover>
                {insurentInfoForm.formState.errors.insurentBirth && (
                  <>
                    <p className="text-xs text-red-500 font-medium">
                      Veuillez saisir une date valide.
                    </p>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={insurentInfoForm.control}
            name="insurentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre adress</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="saisair votre adress"
                    {...field}
                  />
                </FormControl>
                {insurentInfoForm.formState.errors.insurentAddress && (
                  <>
                    <p className="text-xs text-red-500 font-medium">
                      L'addresse doit comporter au moins 6 caractères
                    </p>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={insurentInfoForm.control}
            name="insurentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="saisair votre adress email"
                    {...field}
                  />
                </FormControl>
                {insurentInfoForm.formState.errors.insurentEmail && (
                  <>
                    <p className="text-xs text-red-500 font-medium">
                      Veuillez saisir un email valide.
                    </p>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={insurentInfoForm.control}
            name="insurentPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre téléphone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="saisair votre téléphone"
                    {...field}
                  />
                </FormControl>
                {insurentInfoForm.formState.errors.insurentPhone && (
                  <>
                    <p className="text-xs text-red-500 font-medium">
                      Numéro de téléphone invalide
                    </p>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={insurentInfoForm.control}
            name="insurentCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre ville</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="saisair votre ville"
                    {...field}
                  />
                </FormControl>
                {insurentInfoForm.formState.errors.insurentCity && (
                  <>
                    <p className="text-xs text-red-500 font-medium">
                      La ville doit comporter au moins 3 caractères
                    </p>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={insurentInfoForm.control}
            name="insurentPostalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre code postal</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="saisair votre code postal"
                    {...field}
                  />
                </FormControl>
                {insurentInfoForm.formState.errors.insurentPostalCode && (
                  <>
                    <p className="text-xs text-red-500 font-medium">
                      Veuillez saisir code postal valide.
                    </p>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={insurentInfoForm.control}
            name="alreadyInsurenced"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Êtes-vous assuré(e) actuellement ?</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="oui" />
                    </FormControl>
                    <FormLabel className="font-normal">Oui</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="non" />
                    </FormControl>
                    <FormLabel className="font-normal">Non</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <Button type="submit" className="w-full">
            Suivant
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default InsurentInfo;
