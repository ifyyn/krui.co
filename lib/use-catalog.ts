"use client";

import { useEffect, useState } from "react";
import { Package, getAllPackages } from "./packages";
import { Category, categories as staticCategories } from "./categories";
import { fetchPackages, fetchCategories } from "./catalog";

export function usePackages(): { packages: Package[]; loading: boolean } {
  const [packages, setPackages] = useState<Package[]>(getAllPackages());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchPackages().then((data) => {
      if (!active) return;
      setPackages(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { packages, loading };
}

export function useCategories(): { categories: Category[]; loading: boolean } {
  const [categories, setCategories] = useState<Category[]>(staticCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchCategories().then((cats) => {
      if (!active) return;
      setCategories(cats);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading };
}

export function useCatalog(): {
  packages: Package[];
  categories: Category[];
  loading: boolean;
} {
  const [packages, setPackages] = useState<Package[]>(getAllPackages());
  const [categories, setCategories] = useState<Category[]>(staticCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([fetchPackages(), fetchCategories()]).then(([pkgs, cats]) => {
      if (!active) return;
      setPackages(pkgs);
      setCategories(cats);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { packages, categories, loading };
}