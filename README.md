# Wizualizacja Hierarchii Pracowników 

## Kluczowe Funkcjonalności

- **Interaktywne drzewo hierarchii** - wizualizacja relacji pracowników, możliwość przełączania pomiędzy pracownikami za pośrednictwem bezpośredniego kliknięcia w drzewi
- **Wiele trybów wyświetlania** - możliwość wyświetlenia podwładnych, przełożonych lub całego drzewa
- **Zmiana orientacji** - przełączanie między widokiem pionowym i poziomym
- **Wyszukiwanie pracowników** - filtrowanie w czasie rzeczywistym (po nazwisku/imieniu/imieniu i nazwisku)
- **Responsywny interfejs** - dostosowanie do różnych rozmiarów ekranu
- **Zwijany panel kontrolny** - maksymalizacja przestrzeni
- **Automatyczne przewijanie** - automatyczne przewijanie widoku do wybranego pracownika
- **Sortowanie pracowników** - sortowanie pracownikó alfabetycznie (według nazwiska) w selekcie, w celu łątwiejszej lokalizacji danego pracownika
- **Ścieżka pracownicza** - zaznaczenie ścieżki przełożonych do danego pracownika
- **Identyfikacja pracowników** - identyfikacja według id

## Wykorzystane Technologie

- **Angular Signals** - reaktywne zarządzanie stanem
- **Standalone Components** - zalecane podejście przez Angulara
- **OnPush Change Detection** - w celu wydajności
- **Rekurencyjny komponent drzewa** - wybrane podejście w celu narysowania drzewa hieratchi


## Architektura Aplikacji

- **Komponenty prezentacyjne** - odpowiedzialne za renderowanie UI
- **Serwisy** - zarządzanie danymi i logiką biznesową
- **Modele** - definicje typów i interfejsów
- **Style** - modularny system stylów SCSS
- **Style globalne** - usystematyzowanie podstawowych styli dla całej aplikacji
