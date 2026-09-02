"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Btn, Card, Field, Input, PageHeader } from "@/components/admin/ui";
import { apiChangePassword, apiUpdateProfile } from "@/lib/admin-api";
import { useAdmin } from "@/lib/admin-auth";

export default function AdminSettingsPage() {
  const { user, setUserState } = useAdmin();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");
  const [profileBusy, setProfileBusy] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [pwBusy, setPwBusy] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const onSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg("");
    setProfileErr("");
    setProfileBusy(true);
    try {
      const data = await apiUpdateProfile({ name, email });
      setUserState(data.admin);
      setProfileMsg("Profil berhasil diperbarui");
    } catch (err) {
      setProfileErr(err instanceof Error ? err.message : "Gagal memperbarui profil");
    } finally {
      setProfileBusy(false);
    }
  };

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg("");
    setPwErr("");
    if (newPassword !== confirmPassword) {
      setPwErr("Konfirmasi sandi tidak cocok");
      return;
    }
    setPwBusy(true);
    try {
      const data = await apiChangePassword({ currentPassword, newPassword });
      setPwMsg(data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPwErr(err instanceof Error ? err.message : "Gagal mengubah sandi");
    } finally {
      setPwBusy(false);
    }
  };

  return (
    <AdminShell>
      <PageHeader
        title="Pengaturan"
        subtitle="Kelola akun admin: nama, email, dan sandi"
      />

      <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
        <Card>
          <form onSubmit={onSaveProfile} className="p-6 space-y-4">
            <h2 className="font-display font-700 text-[17px] text-[#111827]">
              Profil
            </h2>
            {profileMsg && (
              <div className="rounded-lg bg-green-50 text-green-700 text-[13px] px-4 py-3">
                {profileMsg}
              </div>
            )}
            {profileErr && (
              <div className="rounded-lg bg-red-50 text-red-600 text-[13px] px-4 py-3">
                {profileErr}
              </div>
            )}
            <Field label="Nama">
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama admin"
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@krui.co"
              />
            </Field>
            <div className="pt-1">
              <Btn type="submit" disabled={profileBusy}>
                {profileBusy ? "Menyimpan…" : "Simpan profil"}
              </Btn>
            </div>
          </form>
        </Card>

        <Card>
          <form onSubmit={onChangePassword} className="p-6 space-y-4">
            <h2 className="font-display font-700 text-[17px] text-[#111827]">
              Ganti sandi
            </h2>
            {pwMsg && (
              <div className="rounded-lg bg-green-50 text-green-700 text-[13px] px-4 py-3">
                {pwMsg}
              </div>
            )}
            {pwErr && (
              <div className="rounded-lg bg-red-50 text-red-600 text-[13px] px-4 py-3">
                {pwErr}
              </div>
            )}
            <Field label="Sandi saat ini">
              <Input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Field>
            <Field label="Sandi baru" hint="Minimal 6 karakter">
              <Input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </Field>
            <Field label="Ulangi sandi baru">
              <Input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </Field>
            <div className="pt-1">
              <Btn type="submit" disabled={pwBusy}>
                {pwBusy ? "Menyimpan…" : "Ganti sandi"}
              </Btn>
            </div>
          </form>
        </Card>
      </div>
    </AdminShell>
  );
}