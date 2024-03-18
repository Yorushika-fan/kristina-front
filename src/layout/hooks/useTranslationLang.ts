import { useNav } from "./useNav";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { watch, onBeforeMount, type Ref } from "vue";

export function useTranslationLang(ref?: Ref) {
  const { $storage, changeTitle, handleResize } = useNav();
  const { locale, t } = useI18n();
  const route = useRoute();

  function translationCh() {
    $storage.locale = { locale: "zh" };
    locale.value = "zh";
    ref && handleResize(ref.value);
  }

  function translationEn() {
    $storage.locale = { locale: "en" };
    locale.value = "en";
    ref && handleResize(ref.value);
  }
  function translationJa() {
    $storage.locale = { locale: "ja" };
    locale.value = "ja";
    ref && handleResize(ref.value);
  }
  function translationRu() {
    $storage.locale = { locale: "ru" };
    locale.value = "ru";
    ref && handleResize(ref.value);
  }
  function translationKo() {
    $storage.locale = { locale: "ko" };
    locale.value = "ko";
    ref && handleResize(ref.value);
  }

  watch(
    () => locale.value,
    () => {
      changeTitle(route.meta);
    }
  );

  onBeforeMount(() => {
    locale.value = $storage.locale?.locale ?? "zh";
  });

  return {
    t,
    route,
    locale,
    translationCh,
    translationEn,
    translationJa,
    translationRu,
    translationKo
  };
}
