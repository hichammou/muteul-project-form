import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReactNode, lazy, useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { CircleCheckBig } from "lucide-react";

const InsurentInfo = lazy(() => import("./forms/InsurentInfo"));
const InsurentPartnerProfile = lazy(
  () => import("./forms/InsurentPartnerProfile")
);
const InsurentProfile = lazy(() => import("./forms/InsurentProfile"));
const InsuranceMemebers = lazy(() => import("./forms/InsuranceMemebers"));

const insurentInfoSchema = z.object({
  insurentCivilite: z.enum(["Madame", "Monsieur"]),
  insurentFName: z.string().min(6, {
    message: "Le prénom doit comporter au moins 6 caractères",
  }),
  insurentLName: z.string().min(6, {
    message: "Le nom doit comporter au moins 6 caractères",
  }),
  insurentBirth: z.date().refine((value) => !isNaN(value.getTime()), {
    message: "Veuillez saisir une date valide.",
  }),
  insurentAddress: z.string().min(10, {
    message: "L'addresse doit comporter au moins 6 caractères",
  }),
  insurentPostalCode: z.string().min(3, {
    message: "Veuillez saisir un code postal valide.",
  }),
  insurentCity: z.string().min(3, {
    message: "La ville doit comporter au moins 3 caractères",
  }),
  insurentPhone: z
    .string()
    .refine(
      (value) =>
        /^\+?\d{1,3}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}$/.test(value),
      {
        message: "Numéro de téléphone est invalide",
      }
    ),
  insurentEmail: z.string().email({
    message: "Veuillez saisir un email valide.",
  }),
  alreadyInsurenced: z.enum(["oui", "non"]),
});

export type InsurentInfoFormState = z.infer<typeof insurentInfoSchema>;

const partnerInfoSchema = z.object({
  partnerCivilite: z.enum(["Madame", "Monsieur"]),
  partnerBirth: z.date().refine((value) => !isNaN(value.getTime()), {
    message: "Veuillez saisir une date valide.",
  }),
  partnerSocialRegime: z.enum([
    "Général",
    "Travailleur non salarié",
    "Agricole",
    "Alsace-Moselle",
  ]),
  partnerProfission: z.enum([
    "Employé / Ouvrier",
    "Cadre",
    "Commerçant",
    "Fonctionnaire",
    "Retraité",
    "Agriculteur",
    "Chef d'entreprise",
    "Profession libérale",
    "Etudiant",
    "Sans profession",
    "Recherche d'emploi",
  ]),
});
export type partnerInfoFormState = z.infer<typeof partnerInfoSchema>;

const insurentProfileSchema = z.object({
  socialRegime: z.enum([
    "Général",
    "Travailleur non salarié",
    "Agricole",
    "Alsace-Moselle",
  ]),
  profission: z.enum([
    "Employé / Ouvrier",
    "Cadre",
    "Commerçant",
    "Fonctionnaire",
    "Retraité",
    "Agriculteur",
    "Chef d'entreprise",
    "Profession libérale",
    "Etudiant",
    "Sans profession",
    "Recherche d'emploi",
  ]),
  secteurActivite: z.string().min(2, {
    message: "Le secteur doit comporter au moin 2 caractères",
  }),
});
export type insurentProfileFormState = z.infer<typeof insurentProfileSchema>;

const insurentsSchema = z.object({
  insuredAdultes: z.string().min(0, {
    message: "Veuillez saisir un nombre valide.",
  }),
  insuredChildren: z.string().min(0, {
    message: "Veuillez saisir un nombre valide.",
  }),
});
export type insurentsFormState = z.infer<typeof insurentsSchema>;

type clientTypes =
  | InsurentInfoFormState
  | partnerInfoFormState
  | insurentProfileFormState
  | insurentsFormState;
function Form() {
  const insurentInfoForm = useForm<z.infer<typeof insurentInfoSchema>>({
    resolver: zodResolver(insurentInfoSchema),
    defaultValues: {
      insurentFName: "",
      insurentLName: "",
      insurentBirth: new Date(),
      insurentAddress: "",
      insurentCity: "",
      insurentEmail: "",
      insurentPhone: "",
      insurentPostalCode: "",
      insurentCivilite: "Monsieur",
      alreadyInsurenced: "non",
    },
  });
  const partnerInfoForm = useForm<z.infer<typeof partnerInfoSchema>>({
    resolver: zodResolver(partnerInfoSchema),
    defaultValues: {
      partnerBirth: new Date(),
      partnerProfission: "Agriculteur",
      partnerCivilite: "Madame",
      partnerSocialRegime: "Agricole",
    },
  });
  const insurentProfileForm = useForm<z.infer<typeof insurentProfileSchema>>({
    resolver: zodResolver(insurentProfileSchema),
    defaultValues: {
      profission: "Agriculteur",
      secteurActivite: "",
      socialRegime: "Agricole",
    },
  });
  const insurentsForm = useForm<z.infer<typeof insurentsSchema>>({
    resolver: zodResolver(insurentsSchema),
    defaultValues: {
      insuredAdultes: "1",
      insuredChildren: "1",
    },
  });
  const [clientData, setClientData] = useState([]);
  const [activeForm, setActiveForm] = useState(0);
  const [status, setStatus] = useState("stail");

  const [forms] = useState<ReactNode[]>([
    <InsurentInfo
      insurentInfoForm={insurentInfoForm}
      handleSubmit={handleSubmit}
    />,
    <InsurentProfile
      insurentProfileForm={insurentProfileForm}
      handleSubmit={handleSubmit}
      handlePrevious={handlePrevious}
    />,
    <InsurentPartnerProfile
      insurentPartnerInfoForm={partnerInfoForm}
      handleSubmit={handleSubmit}
      handlePrevious={handlePrevious}
    />,
    <InsuranceMemebers
      insurentsForm={insurentsForm}
      handleSubmit={handleSubmit}
      handlePrevious={handlePrevious}
    />,
  ]);

  useEffect(() => {
    async function insertCLient() {
      setStatus("pending");
      const { data, error } = await supabase
        .from("clients")
        .insert(clientData)
        .select();
      if (error) throw error;
      return data;
    }
    if (activeForm === 4) {
      insertCLient()
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    }
  }, [activeForm, clientData]);

  function handlePrevious() {
    setActiveForm((prev) => {
      if (prev === 0) return 0;
      return prev - 1;
    });
  }

  function handleSubmit(data: clientTypes) {
    setClientData((prev) => ({ ...prev, ...data }));
    setActiveForm((active) => {
      return active + 1;
    });
  }
  return (
    <div className="md:flex md:justify-center md:items-center">
      {status === "pending" && (
        <div className="md:w-1/2 bg-slate-200 sm:px-20 px-5 py-10 sm:rounded-md animate-pulse h-44"></div>
      )}
      {status === "success" && (
        <div className="md:w-1/2 bg-slate-200 sm:px-20 px-5 py-10 sm:rounded-md h-screen flex flex-col gap-5 items-center justify-center">
          <div>
            <CircleCheckBig className="size-20 text-green-600" />
          </div>
          <div className="text-3xl text-center">
            Votre demande a été bien enregistrée
          </div>
        </div>
      )}
      {activeForm <= 3 && (
        <div className="md:w-1/2 bg-slate-200 sm:px-20 px-5 py-10 bg-opacity-40 sm:bg-opacity-70 sm:rounded-md">
          <div className="flex justify-between items-center mb-4 border-2 border-dashed divide-x-2 divide-dashed divide-slate-400 border-slate-400">
            <div
              className={`${
                activeForm === 0 || activeForm === 1
                  ? "bg-blue-400 text-slate-300"
                  : "bg-slate-200 text-slate-400"
              } flex-1 text-center py-2 text-2xl font-semibold`}
            >
              <span className="hidden md:block">Mon Profile</span>
              <span className="block md:hidden">1</span>
            </div>
            <div
              className={`${
                activeForm === 2
                  ? "bg-blue-400 text-slate-300"
                  : "bg-slate-200 text-slate-400"
              } flex-1 text-center py-2 text-2xl font-semibold`}
            >
              <span className="hidden md:block">Mon Partenaire Profile</span>
              <span className="block md:hidden">2</span>
            </div>
            <div
              className={`${
                activeForm === 3
                  ? "bg-blue-400 text-slate-300"
                  : "bg-slate-200 text-slate-400"
              } flex-1 text-center py-2 text-2xl font-semibold`}
            >
              <span className="hidden md:block">Mes Assurentes</span>
              <span className="block md:hidden">3</span>
            </div>
          </div>
          {Object.keys(insurentInfoForm.formState.errors).length > 0 && (
            <ul className="bg-red-300 text-red-600 px-3 py-3 rounded mb-3">
              {Object.values(insurentInfoForm.formState.errors).map((err) => (
                <li className="text-xs list-inside list-disc" key={err.message}>
                  {err.message}
                </li>
              ))}
            </ul>
          )}
          {Object.keys(insurentProfileForm.formState.errors).length > 0 && (
            <ul className="bg-red-300 text-red-600 px-3 py-3 rounded mb-3">
              {Object.values(insurentProfileForm.formState.errors).map(
                (err) => (
                  <li
                    className="text-xs list-inside list-disc"
                    key={err.message}
                  >
                    {err.message}
                  </li>
                )
              )}
            </ul>
          )}
          {Object.keys(partnerInfoForm.formState.errors).length > 0 && (
            <ul className="bg-red-300 text-red-600 px-3 py-3 rounded mb-3">
              {Object.values(partnerInfoForm.formState.errors).map((err) => (
                <li className="text-xs list-inside list-disc" key={err.message}>
                  {err.message}
                </li>
              ))}
            </ul>
          )}
          {Object.keys(insurentsForm.formState.errors).length > 0 && (
            <ul className="bg-red-300 text-red-600 px-3 py-3 rounded mb-3">
              {Object.values(insurentsForm.formState.errors).map((err) => (
                <li className="text-xs list-inside list-disc" key={err.message}>
                  {err.message}
                </li>
              ))}
            </ul>
          )}
          {forms[activeForm]}
        </div>
      )}
    </div>
  );
}

export default Form;
