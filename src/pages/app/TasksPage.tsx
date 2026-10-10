import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Image,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Eye,
  Instagram,
  Share2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { TaskSubmission, TaskType } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const TasksPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { tasks, submissions, addTask, approveTaskSubmission, rejectTaskSubmission } = useBusiness();

  const [selectedSub, setSelectedSub] = useState<TaskSubmission | null>(null);

  // Add Task Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('Follow Us on Instagram');
  const [taskType, setTaskType] = useState<TaskType>('social_follow');
  const [instructions, setInstructions] = useState('Follow @mybusiness on Instagram and upload a screenshot proof.');
  const [rewardDesc, setRewardDesc] = useState('10% Off Voucher');
  const [rewardVal, setRewardVal] = useState('10');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title: taskTitle,
      instructions,
      task_type: taskType,
      reward_description: rewardDesc,
      reward_points_or_discount: parseFloat(rewardVal) || 0,
      proof_required: true,
      verification_method: 'manual_review',
      is_active: true,
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Customer Tasks & Approvals
            <Badge variant="druto">Honest Verification</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage social tasks & review customer proof uploads before issuing vouchers</p>
        </div>
        <Button variant="druto" size="sm" onClick={() => setIsAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Create New Task
        </Button>
      </div>

      {/* SUBMISSION APPROVALS QUEUE */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-serif text-slate-900">Task Proof Submissions Queue</h3>
        <Card className="p-0 bg-white border-slate-200/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Task Title</th>
                  <th className="py-3.5 px-4">Submitted Proof</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">No task submissions yet.</td>
                  </tr>
                ) : (
                  submissions.map(sub => (
                    <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {sub.customer_name || 'Customer'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {sub.task_title}
                      </td>
                      <td className="py-3.5 px-4">
                        {sub.proof_url ? (
                          <button
                            onClick={() => setSelectedSub(sub)}
                            className="flex items-center gap-1 text-[#800A12] font-semibold hover:underline"
                          >
                            <Image className="w-3.5 h-3.5" /> View Proof Image
                          </button>
                        ) : (
                          <span className="text-slate-400">No image required</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={sub.status === 'approved' ? 'success' : sub.status === 'pending' ? 'warning' : 'danger'}
                          size="sm"
                        >
                          {sub.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {sub.status === 'pending' && (
                          <>
                            <Button
                              variant="druto"
                              size="sm"
                              onClick={() => approveTaskSubmission(sub.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => rejectTaskSubmission(sub.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* ACTIVE TASKS LIST */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-serif text-slate-900">Active Business Tasks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {tasks.map(t => (
            <Card key={t.id} className="p-5 bg-white border-slate-200/80 space-y-3 shadow-sm hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between">
                <Badge variant="druto" size="sm">{t.task_type.toUpperCase()}</Badge>
                <span className="text-xs text-[#800A12] font-extrabold">{t.reward_points_or_discount}% Off Reward</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.instructions}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* PROOF VIEWER MODAL */}
      {selectedSub && (
        <Modal isOpen={Boolean(selectedSub)} onClose={() => setSelectedSub(null)} title="Customer Proof Verification">
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <p className="font-bold text-slate-900">{selectedSub.customer_name}</p>
              <p className="text-slate-600">{selectedSub.proof_notes || 'No submission notes.'}</p>
            </div>
            {selectedSub.proof_url && (
              <img
                src={selectedSub.proof_url}
                alt="Customer Proof"
                className="w-full max-h-80 object-cover rounded-xl border border-slate-200"
              />
            )}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <Button variant="danger" size="sm" onClick={() => { rejectTaskSubmission(selectedSub.id); setSelectedSub(null); }}>
                Reject Proof
              </Button>
              <Button variant="druto" size="sm" onClick={() => { approveTaskSubmission(selectedSub.id); setSelectedSub(null); }}>
                Approve & Unlock Reward
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ADD TASK MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Customer Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input label="Task Title" required value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Task Type</label>
            <select
              value={taskType}
              onChange={e => setTaskType(e.target.value as TaskType)}
              className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12]"
            >
              <option value="social_follow">Social Media Follow (Instagram/FB)</option>
              <option value="social_share">Tag/Share Story</option>
              <option value="upload_proof">Upload Bill Photo / Review Proof</option>
              <option value="referral">Refer a Friend</option>
            </select>
          </div>

          <Input label="Instructions for Customer" required value={instructions} onChange={e => setInstructions(e.target.value)} />
          <Input label="Reward Description" required value={rewardDesc} onChange={e => setRewardDesc(e.target.value)} />
          <Input label="Discount Percentage (%)" type="number" value={rewardVal} onChange={e => setRewardVal(e.target.value)} />

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="druto" size="sm" type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
