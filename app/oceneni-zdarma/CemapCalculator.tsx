"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator, CheckCircle2, ChevronDown, Loader2, Search } from "lucide-react";
import { fetchJsonWithRetry } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

type CemapAction = "Prodej" | "Pronájem";
type CemapKind = "apartment" | "house" | "land" | "commercial" | "other";
type CemapSaleKind = "sale" | "lease";

type CemapAutocompleteItem = { phrase: string; label?: string };
type CemapAutocompleteResponse = { items: CemapAutocompleteItem[] };

type CemapValidatedAddress = {
  wholeAddress: string;
  label?: string;
  addressCode: string;
  municipalPartCode: string | null;
};

type CemapValidatedAddressResponse = { items: CemapValidatedAddress[] };

type CemapEstimationResult = {
  id: string;
  name: string;
  result: number;
  isTesting: boolean;
  isAtypical: boolean;
  atypicalReasons: string[];
  warnings: string[];
};

type CemapEstimationEnvelope = {
  ok: boolean;
  data?: CemapEstimationResult;
  error?: string;
  retryAfterSeconds?: number;
};
type Option = { value: string; label: string };

function CemapSelectDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: ReadonlyArray<Option>;
  onChange: (nextValue: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "Vyberte možnost...";

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!rootRef.current || !target) return;
      if (!rootRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={`relative ${isOpen ? "z-[300]" : "z-[20]"}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative w-full rounded-2xl border bg-white px-4 py-2.5 pr-11 text-left text-sm text-black shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20 ${
          isOpen
            ? "border-[color:var(--gold1)] ring-2 ring-[color:var(--gold1)]/20"
            : "border-black/20 hover:border-black/30"
        }`}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 z-[160] mt-2 overflow-hidden rounded-2xl border border-black/20 bg-white p-1 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.35)]">
          <ul className="max-h-64 overflow-auto">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    value === option.value
                      ? "bg-[color:var(--gold1)]/20 text-black"
                      : "text-black/85 hover:bg-black/5"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

const actionOptions: Array<{ value: CemapAction; label: string }> = [
  { value: "Prodej", label: "Prodej" },
  { value: "Pronájem", label: "Pronájem" },
];

const kindOptions: Array<{ value: CemapKind; label: string }> = [
  { value: "apartment", label: "Byt" },
  { value: "house", label: "Dům" },
  { value: "land", label: "Pozemek" },
  { value: "commercial", label: "Komerční" },
  { value: "other", label: "Ostatní" },
];

const categoryOptionsByKind: Record<CemapKind, Option[]> = {
  apartment: [
    { value: "1+1", label: "1+1" }, { value: "1+kk", label: "1+kk" },
    { value: "2+1", label: "2+1" }, { value: "2+kk", label: "2+kk" },
    { value: "3+1", label: "3+1" }, { value: "3+kk", label: "3+kk" },
    { value: "4+1", label: "4+1" }, { value: "4+kk", label: "4+kk" },
    { value: "5+1", label: "5+1" }, { value: "5+kk", label: "5+kk" },
    { value: "6+1", label: "6+1" }, { value: "6+kk", label: "6+kk" },
    { value: "7+1", label: "7+1" }, { value: "7+kk", label: "7+kk" },
    { value: "Atypický", label: "Atypický" }, { value: "Garsonka", label: "Garsonka" },
    { value: "Jiný", label: "Jiný" },
  ],
  house: [
    { value: "Činžovní", label: "Činžovní" },
    { value: "Na klíč", label: "Na klíč" },
    { value: "Nízkoenergetické", label: "Nízkoenergetické" },
    { value: "Rodinný", label: "Rodinný" },
    { value: "Vily", label: "Vily" },
  ],
  land: [
    { value: "Les", label: "Les" }, { value: "Ostatní", label: "Ostatní" },
    { value: "Pro bydlení", label: "Pro bydlení" },
    { value: "Pro komerční výstavbu", label: "Pro komerční výstavbu" },
    { value: "Trvalý travní porost", label: "Trvalý travní porost" },
    { value: "Zahrada", label: "Zahrada" },
    { value: "Zemědělská půda", label: "Zemědělská půda" },
  ],
  commercial: [
    { value: "Jiný", label: "Jiný" }, { value: "Kancelář", label: "Kancelář" },
    { value: "Obchodní prostory", label: "Obchodní prostory" },
    { value: "Restaurace", label: "Restaurace" }, { value: "Sklad", label: "Sklad" },
    { value: "Ubytování", label: "Ubytování" }, { value: "Výroba", label: "Výroba" },
    { value: "Zemědělský objekt", label: "Zemědělský objekt" },
  ],
  other: [
    { value: "Garáž", label: "Garáž" }, { value: "Historický objekt", label: "Historický objekt" },
    { value: "Chalupa", label: "Chalupa" }, { value: "Chata", label: "Chata" },
    { value: "Jiný", label: "Jiný" },
    { value: "Objekt obč. vybavenosti", label: "Objekt obč. vybavenosti" },
    { value: "Rybník", label: "Rybník" },
    { value: "Zemědělská usedlost", label: "Zemědělská usedlost" },
  ],
};

const ownershipOptions: Option[] = [
  { value: "Osobní", label: "Osobní" }, { value: "Družstevní", label: "Družstevní" },
  { value: "Státní/Obecní", label: "Státní/Obecní" }, { value: "Jiné", label: "Jiné" },
];

const buildingTypeOptions: Option[] = [
  { value: "Cihlová", label: "Cihlová" }, { value: "Dřevěná", label: "Dřevěná" },
  { value: "Kamenná", label: "Kamenná" }, { value: "Montovaná", label: "Montovaná" },
  { value: "Panelová", label: "Panelová" }, { value: "Skeletová", label: "Skeletová" },
  { value: "Smíšená", label: "Smíšená" },
];

const houseTypeOptions: Option[] = [
  { value: "Přízemní", label: "Přízemní" }, { value: "Patrový", label: "Patrový" },
];

const buildingPositionOptions: Option[] = [
  { value: "Rohový", label: "Rohový" }, { value: "Řadový", label: "Řadový" },
  { value: "Samostatný", label: "Samostatný" }, { value: "V bloku", label: "V bloku" },
];

const objectStateOptions: Option[] = [
  { value: "Dobrý", label: "Dobrý" }, { value: "Velmi dobrý", label: "Velmi dobrý" },
  { value: "Po rekonstrukci", label: "Po rekonstrukci" },
  { value: "Před rekonstrukcí", label: "Před rekonstrukcí" },
  { value: "Novostavba", label: "Novostavba" }, { value: "Ve výstavbě", label: "Ve výstavbě" },
  { value: "Projekt", label: "Projekt" }, { value: "Špatný", label: "Špatný" },
  { value: "K demolici", label: "K demolici" },
];

const attributeOptions: Option[] = [
  { value: "Balkón", label: "Balkón" }, { value: "Bezbariérový přístup", label: "Bezbariérový přístup" },
  { value: "Garáž", label: "Garáž" }, { value: "Lodžie", label: "Lodžie" },
  { value: "Parkovací stání", label: "Parkovací stání" }, { value: "Terasa", label: "Terasa" },
  { value: "Výtah", label: "Výtah" }, { value: "Zařízeno", label: "Zařízeno" },
];

const fallbackOceneniFormUrl = "/oceneni-zdarma/#formular";
const ESTIMATION_TECHNICAL_ERROR = "Odhad není z technických důvodů možný.";

function formatCzk(value: number): string {
  return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 }).format(value);
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim()) return error.message.trim();
  return fallback;
}

function normalizeEstimationErrorMessage(
  message: string,
  retryAfterSeconds?: number,
): string {
  const trimmed = message.trim();
  if (!trimmed) return ESTIMATION_TECHNICAL_ERROR;

  const withoutHttpPrefix = trimmed.replace(/^HTTP\s+\d{3}\s*:?\s*/i, "").trim();
  const normalized = withoutHttpPrefix || trimmed;

  if (/^Limit\s+\d+\s+odhadů/i.test(normalized)) {
    if (Number.isFinite(retryAfterSeconds ?? NaN) && (retryAfterSeconds ?? 0) > 0) {
      const minutes = Math.max(1, Math.ceil((retryAfterSeconds as number) / 60));
      return `${normalized} Další pokus zkuste přibližně za ${minutes} min.`;
    }
    return normalized;
  }

  if (
    /CeMAP API není nakonfigurované/i.test(normalized) ||
    /Interní kontaktní e-mail není nakonfigurovaný/i.test(normalized) ||
    /lead-email-failed/i.test(normalized)
  ) {
    return ESTIMATION_TECHNICAL_ERROR;
  }

  return normalized;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  if (!/^[0-9+()\-\s]{7,24}$/.test(value)) return false;
  return value.replace(/\D/g, "").length >= 9;
}

function normalizeMonthDate(value: string): string {
  return /^\d{4}-\d{2}$/.test(value.trim()) ? value.trim() : "";
}

function applyCzechValidationMessage(
  element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
): void {
  if (element.validity.valid) {
    element.setCustomValidity("");
    return;
  }

  if (element.validity.valueMissing) {
    element.setCustomValidity(
      element.type === "checkbox"
        ? "Zaškrtněte prosím toto pole."
        : "Vyplňte prosím toto pole.",
    );
    return;
  }

  if (element.validity.typeMismatch) {
    element.setCustomValidity(
      element.type === "email"
        ? "Zadejte prosím platný e-mail."
        : "Zadejte prosím platnou hodnotu.",
    );
    return;
  }

  if (element.validity.badInput) {
    element.setCustomValidity("Zadejte prosím platnou hodnotu.");
    return;
  }

  if (element.validity.rangeUnderflow || element.validity.stepMismatch) {
    element.setCustomValidity("Zadejte prosím vyšší hodnotu.");
    return;
  }

  element.setCustomValidity("Zkontrolujte prosím vyplněné pole.");
}

function getCurrentMonthDate(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function formatAddressSuggestionLabel(phrase: string): string {
  const parts = phrase
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !/^\d{3}\s?\d{2}$/.test(part))
    .filter((part) => !/^SO POÚ\b/i.test(part))
    .filter((part) => !/^SO ORP\b/i.test(part))
    .filter((part) => !/^okres\b/i.test(part))
    .filter((part) => !/kraj/i.test(part))
    .filter((part) => !/^severovýchod$/i.test(part))
    .filter((part) => !/^česko$/i.test(part))
    .filter((part) => !/^česká republika$/i.test(part));

  const compact = (parts.length > 0 ? parts : phrase.split(",").map((part) => part.trim()).filter(Boolean))
    .slice(0, 3)
    .join(", ");

  if (compact.length <= 70) return compact;
  return `${compact.slice(0, 67).trimEnd()}...`;
}

export default function CemapCalculator() {
  const [addressPhrase, setAddressPhrase] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState<CemapAutocompleteItem[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [validatingAddress, setValidatingAddress] = useState(false);
  const [validatedAddresses, setValidatedAddresses] = useState<CemapValidatedAddress[]>([]);
  const [selectedAddressCode, setSelectedAddressCode] = useState("");
  const [addressError, setAddressError] = useState<string | null>(null);

  const [action, setAction] = useState<CemapAction>("Prodej");
  const saleKind: CemapSaleKind = action === "Pronájem" ? "lease" : "sale";
  const [kind, setKind] = useState<CemapKind>("apartment");
  const [category, setCategory] = useState<string>(categoryOptionsByKind.apartment[0].value);

  const [usableArea, setUsableArea] = useState("70");
  const [landArea, setLandArea] = useState("");
  const [ownership, setOwnership] = useState("Osobní");
  const [buildingType, setBuildingType] = useState("Cihlová");
  const [houseType, setHouseType] = useState("Přízemní");
  const [buildingPosition, setBuildingPosition] = useState("Samostatný");
  const [objectState, setObjectState] = useState("Dobrý");
  const [floor, setFloor] = useState("");
  const [attributes, setAttributes] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [estimation, setEstimation] = useState<CemapEstimationResult | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);

  const selectedAddress = useMemo(
    () => validatedAddresses.find((item) => item.addressCode === selectedAddressCode) ?? null,
    [validatedAddresses, selectedAddressCode],
  );

  const handleNativeInvalid: React.FormEventHandler<HTMLFormElement> = (event) => {
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement
    ) {
      applyCzechValidationMessage(target);
    }
  };

  const handleNativeInput: React.FormEventHandler<HTMLFormElement> = (event) => {
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement
    ) {
      target.setCustomValidity("");
    }
  };

  useEffect(() => {
    const nextOptions = categoryOptionsByKind[kind];
    if (!nextOptions.some((x) => x.value === category)) {
      setCategory(nextOptions[0]?.value ?? "");
    }
  }, [kind, category]);

  useEffect(() => {
    if (addressPhrase.trim().length < 3) {
      setAddressSuggestions([]);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const response = await fetchJsonWithRetry<CemapAutocompleteResponse>(
          `/api/cemap/addresses/autocomplete?phrase=${encodeURIComponent(addressPhrase.trim())}`,
          { timeoutMs: 15000, retries: 1, retryDelayMs: 450 },
        );
        if (cancelled) return;
        setAddressSuggestions(Array.isArray(response.items) ? response.items.slice(0, 8) : []);
        setAddressError(null);
      } catch {
        if (!cancelled) setAddressSuggestions([]);
      } finally {
        if (!cancelled) setLoadingSuggestions(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [addressPhrase]);

  async function validateAddress(explicitPhrase?: string) {
    const phrase = (explicitPhrase ?? addressPhrase).trim();
    if (!phrase) {
      setAddressError("Vyplňte adresu nemovitosti.");
      return;
    }

    setValidatingAddress(true);
    setAddressError(null);
    setSubmitError(null);

    try {
      const response = await fetchJsonWithRetry<CemapValidatedAddressResponse>(
        `/api/cemap/addresses/validate?phrase=${encodeURIComponent(phrase)}`,
        { timeoutMs: 18000, retries: 1, retryDelayMs: 600 },
      );

      const items = Array.isArray(response.items) ? response.items : [];
      if (items.length === 0) {
        setValidatedAddresses([]);
        setSelectedAddressCode("");
        setAddressError("Adresa nebyla nalezena. Zkuste ji upřesnit.");
        return;
      }

      setValidatedAddresses(items);
      setSelectedAddressCode(items[0].addressCode);
      setAddressPhrase(items[0].label ?? formatAddressSuggestionLabel(items[0].wholeAddress));
      setAddressError(null);
      setShowAddressSuggestions(false);
    } catch (error) {
      setValidatedAddresses([]);
      setSelectedAddressCode("");
      setAddressError(getErrorMessage(error, "Nepodařilo se ověřit adresu. Zkuste to prosím znovu."));
    } finally {
      setValidatingAddress(false);
    }
  }

  function toggleAttribute(value: string) {
    setAttributes((prev) => (prev.includes(value) ? prev.filter((entry) => entry !== value) : [...prev, value]));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLockRef.current || isSubmitting) return;
    submitLockRef.current = true;
    setSubmitError(null);
    setEstimation(null);

    if (!selectedAddress) {
      setSubmitError("Nejprve ověřte adresu nemovitosti.");
      submitLockRef.current = false;
      return;
    }
    if (!contactName.trim()) {
      setSubmitError("Vyplňte prosím jméno a příjmení.");
      submitLockRef.current = false;
      return;
    }
    if (!isValidEmail(contactEmail.trim())) {
      setSubmitError("Vyplňte prosím platný e-mail.");
      submitLockRef.current = false;
      return;
    }
    if (!isValidPhone(contactPhone.trim())) {
      setSubmitError("Vyplňte prosím platný telefon.");
      submitLockRef.current = false;
      return;
    }
    if (!gdprConsent) {
      setSubmitError("Bez souhlasu se zpracováním osobních údajů nelze pokračovat.");
      submitLockRef.current = false;
      return;
    }

    const requiresUsableArea = kind !== "land";
    const requiresLandArea = kind === "house" || kind === "land";
    const requiresOwnership = kind === "apartment" || kind === "house";
    const requiresObjectState = kind !== "land";
    const requiresHouseType = kind === "house";

    const usableAreaValue = Number(usableArea);
    if (requiresUsableArea && (!Number.isFinite(usableAreaValue) || usableAreaValue <= 0)) {
      setSubmitError("Vyplňte platnou užitnou plochu (usable_area) v m².");
      submitLockRef.current = false;
      return;
    }

    const landAreaValue = Number(landArea);
    if (requiresLandArea && (!Number.isFinite(landAreaValue) || landAreaValue <= 0)) {
      setSubmitError("Vyplňte platnou plochu pozemku (land_area) v m².");
      submitLockRef.current = false;
      return;
    }

    if (!category.trim()) {
      setSubmitError("Vyberte kategorii nemovitosti.");
      submitLockRef.current = false;
      return;
    }
    if (requiresOwnership && !ownership.trim()) {
      setSubmitError("Vyberte vlastnictví (ownership).");
      submitLockRef.current = false;
      return;
    }
    if (requiresObjectState && !objectState.trim()) {
      setSubmitError("Vyberte stav objektu (object_state).");
      submitLockRef.current = false;
      return;
    }
    if (requiresHouseType && !houseType.trim()) {
      setSubmitError("Vyberte typ domu (house_type).");
      submitLockRef.current = false;
      return;
    }

    const payload: Record<string, unknown> = {
      action,
      kind,
      sale_kind: saleKind,
      category,
      addressCode: selectedAddress.addressCode,
      selectedAddress: selectedAddress.wholeAddress,
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      gdprConsent,
    };

    const normalizedDate = normalizeMonthDate(getCurrentMonthDate());
    if (normalizedDate) payload.date = normalizedDate;
    if (requiresUsableArea) payload.usable_area = Math.round(usableAreaValue);
    if (requiresLandArea) payload.land_area = Math.round(landAreaValue);

    if (ownership.trim()) payload.ownership = ownership.trim();
    if (kind !== "land" && buildingType.trim()) payload.building_type = buildingType.trim();
    if (kind === "house" && houseType.trim()) payload.house_type = houseType.trim();
    if (kind === "house" && buildingPosition.trim()) payload.building_position = buildingPosition.trim();
    if (kind !== "land" && objectState.trim()) payload.object_state = objectState.trim();

    if (kind === "apartment" && floor.trim()) {
      const floorValue = Number(floor);
      if (!Number.isFinite(floorValue) || !Number.isInteger(floorValue)) {
        setSubmitError("Podlaží (floor) musí být celé číslo.");
        submitLockRef.current = false;
        return;
      }
      payload.floor = floorValue;
    }

    if (attributes.length > 0) payload.attributes = attributes;

    setIsSubmitting(true);
    try {
      const response = await fetchJsonWithRetry<CemapEstimationEnvelope>("/api/cemap/estimations", {
        timeoutMs: 25000,
        retries: 1,
        retryDelayMs: 800,
        init: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      });

      if (!response.ok || !response.data) {
        const message = normalizeEstimationErrorMessage(
          typeof response.error === "string" ? response.error : ESTIMATION_TECHNICAL_ERROR,
          response.retryAfterSeconds,
        );
        setSubmitError(message);
        return;
      }

      trackEvent("generate_lead", {
        lead_source: "oceneni_online_kalkulace",
        lead_type: action,
        property_kind: kind,
        sale_kind: saleKind,
      });
      trackEvent("qualify_lead", {
        lead_source: "oceneni_online_kalkulace",
        lead_type: action,
        property_kind: kind,
        sale_kind: saleKind,
      });
      setEstimation(response.data);
      setGdprConsent(false);
    } catch (error) {
      const raw = getErrorMessage(error, ESTIMATION_TECHNICAL_ERROR);
      setSubmitError(normalizeEstimationErrorMessage(raw));
    } finally {
      setIsSubmitting(false);
      submitLockRef.current = false;
    }
  }

  return (
    <div className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-sm backdrop-blur-sm sm:p-6">
      <h3 className="text-2xl font-semibold text-black">
        <span className="inline-flex flex-col items-start">
          <span>Online kalkulace tržní ceny</span>
          <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
        </span>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-black/70">
        Vyplňte následující formulář.
      </p>

      <form
        className="mt-5 grid gap-4"
        onSubmit={handleSubmit}
        onInvalidCapture={handleNativeInvalid}
        onInputCapture={handleNativeInput}
      >
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-black">Adresa nemovitosti *</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={addressPhrase}
                onChange={(event) => {
                  setAddressPhrase(event.target.value);
                  setValidatedAddresses([]);
                  setSelectedAddressCode("");
                  setAddressError(null);
                  setShowAddressSuggestions(true);
                }}
                onFocus={() => {
                  if (addressSuggestions.length > 0) setShowAddressSuggestions(true);
                }}
                onBlur={() => {
                  window.setTimeout(() => setShowAddressSuggestions(false), 120);
                }}
                className="w-full rounded-xl border-2 border-black/20 bg-white px-3 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                placeholder="Např. Zámečnická 563/8, Liberec"
                required
              />
              {showAddressSuggestions && addressSuggestions.length > 0 ? (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[170] overflow-hidden rounded-xl border border-black/15 bg-white shadow-lg">
                  <ul className="max-h-56 overflow-auto">
                    {addressSuggestions.map((item) => (
                      <li key={item.phrase}>
                        <button
                          type="button"
                          onMouseDown={() => {
                            setAddressPhrase(item.label ?? formatAddressSuggestionLabel(item.phrase));
                            setShowAddressSuggestions(false);
                            void validateAddress(item.phrase);
                          }}
                          className="block w-full px-3 py-2.5 text-left text-sm text-black/80 transition hover:bg-black/5"
                          title={item.phrase}
                        >
                          <span className="block truncate">
                            {item.label ?? formatAddressSuggestionLabel(item.phrase)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => {
                void validateAddress();
              }}
              disabled={validatingAddress}
              className="btn-main inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-60"
            >
              {validatingAddress ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Ověřit
            </button>
          </div>

          {loadingSuggestions ? <p className="mt-1 text-xs text-black/50">Načítám návrhy adres...</p> : null}
          {addressError ? <p className="mt-2 text-sm text-red-700">{addressError}</p> : null}

          {selectedAddress ? (
            <div
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-800"
              title={selectedAddress.wholeAddress}
            >
              <CheckCircle2 className="h-4 w-4" />
              Ověřená adresa: {selectedAddress.label ?? formatAddressSuggestionLabel(selectedAddress.wholeAddress)}
            </div>
          ) : null}

          {validatedAddresses.length > 1 ? (
            <div className="mt-2">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-black/60">Upřesněte konkrétní adresu</label>
              <CemapSelectDropdown
                value={selectedAddressCode}
                onChange={(nextCode) => {
                  setSelectedAddressCode(nextCode);
                  const picked = validatedAddresses.find((item) => item.addressCode === nextCode);
                  if (picked) {
                    setAddressPhrase(picked.label ?? formatAddressSuggestionLabel(picked.wholeAddress));
                  }
                }}
                options={validatedAddresses.map((item) => ({
                  value: item.addressCode,
                  label: item.label ?? formatAddressSuggestionLabel(item.wholeAddress),
                }))}
              />
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Typ poptávky *</label>
            <CemapSelectDropdown
              value={action}
              onChange={(nextValue) => setAction(nextValue as CemapAction)}
              options={actionOptions}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Typ nemovitosti *</label>
            <CemapSelectDropdown
              value={kind}
              onChange={(nextValue) => setKind(nextValue as CemapKind)}
              options={kindOptions}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Kategorie nemovitosti *</label>
            <CemapSelectDropdown
              value={category}
              onChange={(nextValue) => setCategory(nextValue)}
              options={categoryOptionsByKind[kind]}
            />
          </div>

          {kind !== "land" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Užitná plocha (m²) *</label>
              <input type="number" min={1} step={1} value={usableArea} onChange={(event) => setUsableArea(event.target.value)} className="w-full rounded-xl border border-black/20 bg-white px-3 py-2.5 text-sm text-black focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20" required />
            </div>
          ) : null}

          {kind === "house" || kind === "land" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Plocha pozemku (m²) *</label>
              <input type="number" min={1} step={1} value={landArea} onChange={(event) => setLandArea(event.target.value)} className="w-full rounded-xl border border-black/20 bg-white px-3 py-2.5 text-sm text-black focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20" required />
            </div>
          ) : null}

          {kind === "apartment" || kind === "house" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Vlastnictví</label>
              <CemapSelectDropdown
                value={ownership}
                onChange={(nextValue) => setOwnership(nextValue)}
                options={ownershipOptions}
              />
            </div>
          ) : null}

          {kind !== "land" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Stav objektu</label>
              <CemapSelectDropdown
                value={objectState}
                onChange={(nextValue) => setObjectState(nextValue)}
                options={objectStateOptions}
              />
            </div>
          ) : null}

          {kind !== "land" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Typ budovy</label>
              <CemapSelectDropdown
                value={buildingType}
                onChange={(nextValue) => setBuildingType(nextValue)}
                options={buildingTypeOptions}
              />
            </div>
          ) : null}

          {kind === "house" ? (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-black">Typ domu</label>
                <CemapSelectDropdown
                  value={houseType}
                  onChange={(nextValue) => setHouseType(nextValue)}
                  options={houseTypeOptions}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">Umístění domu</label>
                <CemapSelectDropdown
                  value={buildingPosition}
                  onChange={(nextValue) => setBuildingPosition(nextValue)}
                  options={buildingPositionOptions}
                />
              </div>
            </>
          ) : null}

          {kind === "apartment" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Podlaží (nepovinné)</label>
              <input type="number" step={1} value={floor} onChange={(event) => setFloor(event.target.value)} className="w-full rounded-xl border border-black/20 bg-white px-3 py-2.5 text-sm text-black focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20" placeholder="Např. 3" />
            </div>
          ) : null}
        </div>

        {kind !== "land" ? (
          <div className="rounded-2xl border border-black/10 bg-white/75 p-4 sm:p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-black/60">
              <span className="inline-flex flex-col items-start">
                <span>Atributy nemovitosti (volitelné)</span>
                <span className="mt-2 h-[4px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {attributeOptions.map((option) => (
                <label key={option.value} className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-3 py-2 text-sm text-black">
                  <input type="checkbox" checked={attributes.includes(option.value)} onChange={() => toggleAttribute(option.value)} className="h-4 w-4 rounded border-black/20 text-black focus:ring-[color:var(--gold1)]" />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl border border-black/10 bg-white/75 p-4 sm:p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-black/60">
            <span className="inline-flex flex-col items-start">
              <span>Kontaktní údaje pro výsledek</span>
              <span className="mt-2 h-[4px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
          </p>
          <p className="mt-2 text-sm text-black/70">
            Tyto údaje jsou povinné.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Jméno a příjmení *</label>
              <input type="text" value={contactName} onChange={(event) => setContactName(event.target.value)} className="w-full rounded-xl border border-black/20 bg-white px-3 py-2.5 text-sm text-black focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20" placeholder="Např. Jan Novák" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Telefon *</label>
              <input type="tel" value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} className="w-full rounded-xl border border-black/20 bg-white px-3 py-2.5 text-sm text-black focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20" placeholder="+420 721 292 462" required />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-black">E-mail *</label>
              <input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} className="w-full rounded-xl border border-black/20 bg-white px-3 py-2.5 text-sm text-black focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20" placeholder="napr. jan@example.com" required />
            </div>
          </div>

          <label className="mt-4 inline-flex items-start gap-2 text-sm text-black/80">
            <input type="checkbox" checked={gdprConsent} onChange={(event) => setGdprConsent(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/25 text-black focus:ring-[color:var(--gold1)]" required />
            <span>
              Souhlasím se zpracováním osobních údajů pro účely ocenění nemovitosti a následného kontaktování. {" "}
              <Link href="/gdpr/" className="font-semibold underline underline-offset-2 hover:no-underline">GDPR</Link>{" "}
              a {" "}
              <Link href="/zpracovani-osobnich-udaju-oceneni/" className="font-semibold underline underline-offset-2 hover:no-underline">podrobnosti ke zpracování pro ocenění</Link>.
            </span>
          </label>
        </div>

        {submitError ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p> : null}

        <button type="submit" disabled={isSubmitting} className="btn-main inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-6 py-3.5 text-base font-semibold text-black disabled:opacity-60">
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Calculator className="h-5 w-5" />}
          {isSubmitting ? "Počítám odhad..." : "Spočítat tržní odhad"}
        </button>
      </form>

      {estimation ? (
        <div className="mt-5 rounded-2xl border border-black/15 bg-white p-4 sm:p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-black/55">Výsledek odhadu</p>
          <p className="mt-2 text-3xl font-bold text-black">
            {formatCzk(estimation.result)}
            {saleKind === "lease" ? <span className="ml-1 text-base font-medium text-black/60">/ měsíc</span> : null}
          </p>
          <p className="mt-2 text-sm text-black/70">{estimation.name}</p>

          {estimation.isAtypical ? (
            <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">Nemovitost je atypická, doporučujeme individuální nacenění s makléřem.</div>
          ) : null}

          {estimation.atypicalReasons?.length ? (
            <div className="mt-3">
              <p className="text-sm font-semibold text-black">Důvody atypičnosti:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-black/70">{estimation.atypicalReasons.map((reason) => (<li key={reason}>{reason}</li>))}</ul>
            </div>
          ) : null}

          {estimation.warnings?.length ? (
            <div className="mt-3">
              <p className="text-sm font-semibold text-black">Technické poznámky:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-black/70">{estimation.warnings.map((warning) => (<li key={warning}>{warning}</li>))}</ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="mt-4 text-xs text-black/55">
        Pokud je API dočasně nedostupné, pokračujte prosím přes náš{" "}
        <a href={fallbackOceneniFormUrl} className="font-semibold text-black/75 underline-offset-2 hover:underline">formulář pro přesné ocenění</a>.
      </p>
    </div>
  );
}
