"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronUp,
  Trophy,
  Users,
  Star,
  Save,
  Loader2,
  Plus,
  Edit2,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  bio: string;
  avatar: string | null;
}

interface WeekProgress {
  id: string;
  week: number;
  shipTarget: string;
  completed: boolean;
  score: number;
  feedback: string;
}

interface Team {
  id: string;
  slug: string;
  name: string;
  productName: string;
  description: string;
  niche: string;
  currentWeek: number;
  totalPoints: number;
  status: string;
  members: TeamMember[];
  progress: WeekProgress[];
}

/* ------------------------------------------------------------------ */
/*  Colour maps                                                        */
/* ------------------------------------------------------------------ */

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  graduated: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const roleColors: Record<string, string> = {
  hacker: "bg-blue-100 text-blue-800",
  hustler: "bg-orange-100 text-orange-800",
  hipster: "bg-pink-100 text-pink-800",
  hound: "bg-emerald-100 text-emerald-800",
};

/* ------------------------------------------------------------------ */
/*  Cute avatar helper                                                 */
/* ------------------------------------------------------------------ */

function avatarUrl(name: string) {
  const seed = encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TeamsManagementContent({ teams: initial }: { teams: Team[] }) {
  const [teams, setTeams] = useState(initial);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Score form
  const [scoringTeam, setScoringTeam] = useState<string | null>(null);
  const [scoreInputs, setScoreInputs] = useState<
    Record<string, { week: string; score: string; feedback: string }>
  >({});
  const [saving, setSaving] = useState(false);

  // Create team dialog
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    productName: "",
    description: "",
    niche: "",
  });
  const [creating, setCreating] = useState(false);

  // Edit team dialog
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editTeamForm, setEditTeamForm] = useState({
    name: "",
    productName: "",
    description: "",
    niche: "",
    status: "",
    currentWeek: "",
  });
  const [editingSaving, setEditingSaving] = useState(false);

  // Add member dialog
  const [addMemberTeam, setAddMemberTeam] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    role: "hacker",
    skills: "",
    bio: "",
    password: "",
  });
  const [addingMember, setAddingMember] = useState(false);

  // Edit member dialog
  const [editingMember, setEditingMember] = useState<{
    teamId: string;
    member: TeamMember;
  } | null>(null);
  const [editMemberForm, setEditMemberForm] = useState({
    name: "",
    email: "",
    role: "",
    skills: "",
    bio: "",
    password: "",
  });
  const [editMemberSaving, setEditMemberSaving] = useState(false);

  /* ------ Submit Score ------ */
  async function submitScore(teamId: string) {
    const input = scoreInputs[teamId];
    if (!input) return;
    setSaving(true);

    const res = await fetch(`/api/admin/teams/${teamId}/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        week: parseInt(input.week),
        score: parseInt(input.score),
        feedback: input.feedback,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setTeams((prev) =>
        prev.map((t) => {
          if (t.id !== teamId) return t;
          const existing = t.progress.find(
            (p) => p.week === parseInt(input.week)
          );
          if (existing) {
            return {
              ...t,
              totalPoints: data.totalPoints ?? t.totalPoints,
              progress: t.progress.map((p) =>
                p.week === parseInt(input.week)
                  ? {
                      ...p,
                      score: parseInt(input.score),
                      completed: true,
                      feedback: input.feedback,
                    }
                  : p
              ),
            };
          }
          return {
            ...t,
            totalPoints: data.totalPoints ?? t.totalPoints,
            progress: [
              ...t.progress,
              {
                id: "new",
                week: parseInt(input.week),
                shipTarget: "",
                completed: true,
                score: parseInt(input.score),
                feedback: input.feedback,
              },
            ].sort((a, b) => a.week - b.week),
          };
        })
      );
      setScoringTeam(null);
      setScoreInputs((prev) => {
        const next = { ...prev };
        delete next[teamId];
        return next;
      });
    }
    setSaving(false);
  }

  /* ------ Create Team ------ */
  async function handleCreateTeam() {
    setCreating(true);
    const res = await fetch("/api/admin/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createForm),
    });
    if (res.ok) {
      const team = await res.json();
      setTeams((prev) => [
        ...prev,
        {
          ...team,
          status: (team.status || "ACTIVE").toLowerCase(),
          members: [],
          progress: [],
          currentWeek: team.currentWeek || 1,
          totalPoints: team.totalPoints || 0,
        },
      ]);
      setShowCreateTeam(false);
      setCreateForm({ name: "", productName: "", description: "", niche: "" });
    }
    setCreating(false);
  }

  /* ------ Edit Team ------ */
  function openEditTeam(team: Team) {
    setEditingTeam(team);
    setEditTeamForm({
      name: team.name,
      productName: team.productName,
      description: team.description,
      niche: team.niche,
      status: team.status,
      currentWeek: String(team.currentWeek),
    });
  }

  async function handleEditTeam() {
    if (!editingTeam) return;
    setEditingSaving(true);
    const res = await fetch("/api/admin/teams", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingTeam.id,
        name: editTeamForm.name,
        productName: editTeamForm.productName,
        description: editTeamForm.description,
        niche: editTeamForm.niche,
        status: editTeamForm.status,
        currentWeek: parseInt(editTeamForm.currentWeek),
      }),
    });
    if (res.ok) {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === editingTeam.id
            ? {
                ...t,
                name: editTeamForm.name,
                productName: editTeamForm.productName,
                description: editTeamForm.description,
                niche: editTeamForm.niche,
                status: editTeamForm.status,
                currentWeek: parseInt(editTeamForm.currentWeek),
              }
            : t
        )
      );
      setEditingTeam(null);
    }
    setEditingSaving(false);
  }

  /* ------ Delete Team ------ */
  async function handleDeleteTeam(teamId: string) {
    if (!confirm("Delete this team? This will remove all members and progress data."))
      return;
    const res = await fetch(`/api/admin/teams?id=${teamId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTeams((prev) => prev.filter((t) => t.id !== teamId));
      setExpandedId(null);
    }
  }

  /* ------ Add Member ------ */
  async function handleAddMember() {
    if (!addMemberTeam) return;
    setAddingMember(true);
    const res = await fetch(`/api/admin/teams/${addMemberTeam}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: memberForm.name,
        email: memberForm.email,
        role: memberForm.role,
        skills: memberForm.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        bio: memberForm.bio,
        password: memberForm.password,
      }),
    });
    if (res.ok) {
      const member = await res.json();
      setTeams((prev) =>
        prev.map((t) =>
          t.id === addMemberTeam
            ? {
                ...t,
                members: [
                  ...t.members,
                  {
                    ...member,
                    role: member.role.toLowerCase(),
                    skills: member.skills || [],
                    avatar: member.avatar || null,
                  },
                ],
              }
            : t
        )
      );
      setAddMemberTeam(null);
      setMemberForm({
        name: "",
        email: "",
        role: "hacker",
        skills: "",
        bio: "",
        password: "",
      });
    }
    setAddingMember(false);
  }

  /* ------ Edit Member ------ */
  function openEditMember(teamId: string, member: TeamMember) {
    setEditingMember({ teamId, member });
    setEditMemberForm({
      name: member.name,
      email: member.email,
      role: member.role,
      skills: member.skills.join(", "),
      bio: member.bio,
      password: "",
    });
  }

  async function handleEditMember() {
    if (!editingMember) return;
    setEditMemberSaving(true);

    const body: Record<string, unknown> = {
      memberId: editingMember.member.id,
      name: editMemberForm.name,
      email: editMemberForm.email,
      role: editMemberForm.role,
      skills: editMemberForm.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      bio: editMemberForm.bio,
      avatar: avatarUrl(editMemberForm.name),
    };
    if (editMemberForm.password) {
      body.password = editMemberForm.password;
    }

    const res = await fetch(
      `/api/admin/teams/${editingMember.teamId}/members`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (res.ok) {
      const updated = await res.json();
      setTeams((prev) =>
        prev.map((t) =>
          t.id === editingMember.teamId
            ? {
                ...t,
                members: t.members.map((m) =>
                  m.id === editingMember.member.id
                    ? {
                        ...m,
                        name: updated.name,
                        email: updated.email,
                        role: updated.role.toLowerCase(),
                        skills: updated.skills || [],
                        bio: updated.bio,
                        avatar: updated.avatar || null,
                      }
                    : m
                ),
              }
            : t
        )
      );
      setEditingMember(null);
    }
    setEditMemberSaving(false);
  }

  /* ------ Delete Member ------ */
  async function handleDeleteMember(teamId: string, memberId: string) {
    if (!confirm("Remove this member from the team?")) return;
    const res = await fetch(
      `/api/admin/teams/${teamId}/members?memberId=${memberId}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId
            ? { ...t, members: t.members.filter((m) => m.id !== memberId) }
            : t
        )
      );
    }
  }

  /* ================================================================== */
  /*  Render                                                             */
  /* ================================================================== */

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">
            Manage teams, members, and weekly scores
          </p>
        </div>
        <Button onClick={() => setShowCreateTeam(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Create Team
        </Button>
      </div>

      {/* Team List */}
      <div className="space-y-4">
        {teams.map((team) => {
          const isExpanded = expandedId === team.id;
          const progressPercent = Math.round((team.currentWeek / 12) * 100);

          return (
            <Card
              key={team.id}
              className={isExpanded ? "ring-1 ring-primary/20" : ""}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : team.id)}
                className="flex w-full items-center gap-4 px-6 py-4 text-left"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{team.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ({team.productName})
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        statusColors[team.status] || ""
                      }`}
                    >
                      {team.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {team.members.length} members
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3.5 w-3.5" />
                      {team.totalPoints} pts
                    </span>
                    <span>Week {team.currentWeek}/12</span>
                  </div>
                </div>
                <div className="hidden sm:block w-24">
                  <Progress value={progressPercent} className="h-2" />
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <CardContent className="border-t pt-6 space-y-6">
                  {/* Team Actions */}
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditTeam(team)}
                    >
                      <Edit2 className="mr-1 h-3.5 w-3.5" />
                      Edit Team
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteTeam(team.id)}
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>

                  {/* Team Info */}
                  <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                    <div className="grid gap-2 sm:grid-cols-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Niche:</span>{" "}
                        <span className="font-medium">{team.niche}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Slug:</span>{" "}
                        <span className="font-mono text-xs">{team.slug}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {team.description}
                    </p>
                  </div>

                  {/* Members */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold">Team Members</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAddMemberTeam(team.id)}
                      >
                        <UserPlus className="mr-1 h-3.5 w-3.5" />
                        Add Member
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {team.members.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center gap-3 rounded-lg border p-3 group"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={m.avatar || avatarUrl(m.name)}
                            alt={m.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 shrink-0 rounded-full bg-muted"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">{m.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {m.email}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs capitalize shrink-0 ${
                              roleColors[m.role] || ""
                            }`}
                          >
                            {m.role}
                          </Badge>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => openEditMember(team.id, m)}
                              title="Edit member"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500 hover:text-red-600"
                              onClick={() =>
                                handleDeleteMember(team.id, m.id)
                              }
                              title="Remove member"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {team.members.length === 0 && (
                        <p className="text-sm text-muted-foreground col-span-2 text-center py-4">
                          No members yet
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Weekly Scores */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold">Weekly Scores</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setScoringTeam(
                            scoringTeam === team.id ? null : team.id
                          )
                        }
                      >
                        <Star className="mr-1 h-3.5 w-3.5" />
                        Add Score
                      </Button>
                    </div>

                    {scoringTeam === team.id && (
                      <div className="mb-4 rounded-lg border bg-muted/30 p-4 space-y-3">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <Label className="text-xs">Week</Label>
                            <Input
                              type="number"
                              min={1}
                              max={12}
                              placeholder="1-12"
                              value={scoreInputs[team.id]?.week || ""}
                              onChange={(e) =>
                                setScoreInputs((prev) => ({
                                  ...prev,
                                  [team.id]: {
                                    ...prev[team.id],
                                    week: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Score (1-10)</Label>
                            <Input
                              type="number"
                              min={1}
                              max={10}
                              placeholder="1-10"
                              value={scoreInputs[team.id]?.score || ""}
                              onChange={(e) =>
                                setScoreInputs((prev) => ({
                                  ...prev,
                                  [team.id]: {
                                    ...prev[team.id],
                                    score: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Feedback</Label>
                            <Input
                              placeholder="Great work on..."
                              value={scoreInputs[team.id]?.feedback || ""}
                              onChange={(e) =>
                                setScoreInputs((prev) => ({
                                  ...prev,
                                  [team.id]: {
                                    ...prev[team.id],
                                    feedback: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => submitScore(team.id)}
                          disabled={saving}
                        >
                          {saving ? (
                            <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Save className="mr-1 h-3.5 w-3.5" />
                          )}
                          Submit Score
                        </Button>
                      </div>
                    )}

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Week</TableHead>
                          <TableHead>Ship Target</TableHead>
                          <TableHead className="w-20 text-center">
                            Score
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Feedback
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {team.progress.map((p) => (
                          <TableRow key={p.week}>
                            <TableCell className="text-center font-medium">
                              {p.week}
                            </TableCell>
                            <TableCell className="text-sm">
                              {p.shipTarget || `Week ${p.week}`}
                            </TableCell>
                            <TableCell className="text-center">
                              {p.completed ? (
                                <span className="font-bold">{p.score}/10</span>
                              ) : (
                                <Badge variant="outline" className="text-xs">
                                  Pending
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                              {p.feedback || "—"}
                            </TableCell>
                          </TableRow>
                        ))}
                        {team.progress.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-4 text-muted-foreground"
                            >
                              No progress data yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}

        {teams.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No teams yet. Click &ldquo;Create Team&rdquo; to add one.
            </CardContent>
          </Card>
        )}
      </div>

      {/* ============================================================= */}
      {/*  Create Team Dialog                                            */}
      {/* ============================================================= */}
      <Dialog open={showCreateTeam} onOpenChange={setShowCreateTeam}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              Add a new team to the bootcamp.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Team Name</Label>
                <Input
                  placeholder="e.g. Tindahan Tech"
                  value={createForm.name}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Product Name</Label>
                <Input
                  placeholder="e.g. SariTrack"
                  value={createForm.productName}
                  onChange={(e) =>
                    setCreateForm((p) => ({
                      ...p,
                      productName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Niche</Label>
              <Input
                placeholder="e.g. Logistics / FinTech"
                value={createForm.niche}
                onChange={(e) =>
                  setCreateForm((p) => ({ ...p, niche: e.target.value }))
                }
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea
                placeholder="What does this team build?"
                value={createForm.description}
                onChange={(e) =>
                  setCreateForm((p) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateTeam(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTeam}
              disabled={
                creating ||
                !createForm.name ||
                !createForm.productName ||
                !createForm.description ||
                !createForm.niche
              }
            >
              {creating && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ============================================================= */}
      {/*  Edit Team Dialog                                              */}
      {/* ============================================================= */}
      <Dialog
        open={editingTeam !== null}
        onOpenChange={(open) => !open && setEditingTeam(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>
              Update team details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Team Name</Label>
                <Input
                  value={editTeamForm.name}
                  onChange={(e) =>
                    setEditTeamForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Product Name</Label>
                <Input
                  value={editTeamForm.productName}
                  onChange={(e) =>
                    setEditTeamForm((p) => ({
                      ...p,
                      productName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Niche</Label>
                <Input
                  value={editTeamForm.niche}
                  onChange={(e) =>
                    setEditTeamForm((p) => ({ ...p, niche: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Status</Label>
                <Select
                  value={editTeamForm.status}
                  onValueChange={(v) =>
                    setEditTeamForm((p) => ({ ...p, status: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs">Current Week (1-12)</Label>
              <Input
                type="number"
                min={1}
                max={12}
                value={editTeamForm.currentWeek}
                onChange={(e) =>
                  setEditTeamForm((p) => ({
                    ...p,
                    currentWeek: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea
                value={editTeamForm.description}
                onChange={(e) =>
                  setEditTeamForm((p) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTeam(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditTeam} disabled={editingSaving}>
              {editingSaving && (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ============================================================= */}
      {/*  Add Member Dialog                                             */}
      {/* ============================================================= */}
      <Dialog
        open={addMemberTeam !== null}
        onOpenChange={(open) => !open && setAddMemberTeam(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Add a new member to the team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {memberForm.name && (
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl(memberForm.name)}
                  alt="Preview"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full bg-muted"
                />
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Name</Label>
                <Input
                  placeholder="Juan Dela Cruz"
                  value={memberForm.name}
                  onChange={(e) =>
                    setMemberForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  placeholder="juan@example.com"
                  value={memberForm.email}
                  onChange={(e) =>
                    setMemberForm((p) => ({ ...p, email: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Role</Label>
                <Select
                  value={memberForm.role}
                  onValueChange={(v) =>
                    setMemberForm((p) => ({ ...p, role: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hacker">Hacker</SelectItem>
                    <SelectItem value="hustler">Hustler</SelectItem>
                    <SelectItem value="hipster">Hipster</SelectItem>
                    <SelectItem value="hound">Hound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Password</Label>
                <Input
                  type="password"
                  placeholder="Min 8 characters"
                  value={memberForm.password}
                  onChange={(e) =>
                    setMemberForm((p) => ({
                      ...p,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Skills (comma-separated)</Label>
              <Input
                placeholder="React, TypeScript, Figma"
                value={memberForm.skills}
                onChange={(e) =>
                  setMemberForm((p) => ({ ...p, skills: e.target.value }))
                }
              />
            </div>
            <div>
              <Label className="text-xs">Bio</Label>
              <Textarea
                placeholder="Short bio..."
                value={memberForm.bio}
                onChange={(e) =>
                  setMemberForm((p) => ({ ...p, bio: e.target.value }))
                }
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddMemberTeam(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddMember}
              disabled={
                addingMember ||
                !memberForm.name ||
                !memberForm.email ||
                !memberForm.bio
              }
            >
              {addingMember && (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              )}
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ============================================================= */}
      {/*  Edit Member Dialog                                            */}
      {/* ============================================================= */}
      <Dialog
        open={editingMember !== null}
        onOpenChange={(open) => !open && setEditingMember(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update member details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl(editMemberForm.name || "preview")}
                alt="Preview"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full bg-muted"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Name</Label>
                <Input
                  value={editMemberForm.name}
                  onChange={(e) =>
                    setEditMemberForm((p) => ({
                      ...p,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  value={editMemberForm.email}
                  onChange={(e) =>
                    setEditMemberForm((p) => ({
                      ...p,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Role</Label>
                <Select
                  value={editMemberForm.role}
                  onValueChange={(v) =>
                    setEditMemberForm((p) => ({ ...p, role: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hacker">Hacker</SelectItem>
                    <SelectItem value="hustler">Hustler</SelectItem>
                    <SelectItem value="hipster">Hipster</SelectItem>
                    <SelectItem value="hound">Hound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">New Password (optional)</Label>
                <Input
                  type="password"
                  placeholder="Leave blank to keep"
                  value={editMemberForm.password}
                  onChange={(e) =>
                    setEditMemberForm((p) => ({
                      ...p,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Skills (comma-separated)</Label>
              <Input
                value={editMemberForm.skills}
                onChange={(e) =>
                  setEditMemberForm((p) => ({
                    ...p,
                    skills: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label className="text-xs">Bio</Label>
              <Textarea
                value={editMemberForm.bio}
                onChange={(e) =>
                  setEditMemberForm((p) => ({
                    ...p,
                    bio: e.target.value,
                  }))
                }
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingMember(null)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditMember} disabled={editMemberSaving}>
              {editMemberSaving && (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
