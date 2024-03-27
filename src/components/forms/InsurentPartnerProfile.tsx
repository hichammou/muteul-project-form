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
import { partnerInfoFormState } from "../Form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MouseEventHandler, useState } from "react";

function InsurentPartnerProfile({
  insurentPartnerInfoForm,
  handleSubmit,
  handlePrevious,
}: {
  insurentPartnerInfoForm: UseFormReturn<partnerInfoFormState>;
  handleSubmit: SubmitHandler<partnerInfoFormState>;
  handlePrevious: MouseEventHandler;
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  return (
    <Form {...insurentPartnerInfoForm}>
      <form
        className="space-y-5"
        onSubmit={insurentPartnerInfoForm.handleSubmit(handleSubmit)}
      >
        <div className="space-y-5">
          <FormField
            control={insurentPartnerInfoForm.control}
            name="partnerCivilite"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Civilité de votre conjoint</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={insurentPartnerInfoForm.control}
            name="partnerBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de naissance de votre conjoint</FormLabel>
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
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setIsCalendarOpen(false);
                      }}
                      fromYear={1960}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
                {insurentPartnerInfoForm.formState.errors.partnerBirth && (
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
            control={insurentPartnerInfoForm.control}
            name="partnerSocialRegime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Régime social de votre conjoint</FormLabel>
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
                      <SelectItem
                        className="cursor-pointer"
                        value={r}
                        key={`ipp-${r}`}
                      >
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
            control={insurentPartnerInfoForm.control}
            name="partnerProfission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession de votre conjoint</FormLabel>
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
                      <SelectItem
                        className="cursor-pointer"
                        value={p}
                        key={`ipp-${p}`}
                      >
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

export default InsurentPartnerProfile;
